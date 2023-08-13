import { Pedidos } from "@prisma/client";
import {
   object,
   string,
   number,
   date,
   InferType,
   addMethod,
   AnyObject,
   StringSchema,
} from "yup";

export interface ClienteDTO {
   id: number;
   nome: string;
   cpf: string;
   data_nasc: Date;
   telefone: string;
   ativo: number;
   pedidos?: Pedidos[];
   createdAt?: Date;
   updatedAt?: Date;
}
addMethod(string, "cpf", function () {
   return this.test("cpf", "Invalid CPF", (value) => {
      if (!value) return true; // Allow empty values
      const cpf = value.replace(/[^\d]/g, ""); // Remove non-digit characters

      if (cpf.length < 14 || cpf.length > 15) return false;

      // ... CPF validation logic ...

      return true;
   });
});

export const createUserSchema = object({
   nome: string().required("Nome is required").min(3),
   cpf: string().required("CPF is required").max(15),
   data_nasc: date()
      .required("Date is required")
      .max(new Date(), "Data de Nascimento cannot be in the future"),
   telefone: string().max(15),
   ativo: number().min(1).max(1).required("Ativo status is required"),
});

export const updateUserSchema = object({
   nome: string().required("Nome is required").min(3),
   cpf: string().required("CPF is required"),
   data_nasc: date()
      .required("Date is required")
      .max(new Date(), "Data de Nascimento cannot be in the future"),
   telefone: string().max(15).required(),
});
