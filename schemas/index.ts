import { z } from "zod";

export const LoginSchema = z.object({
   email: z.string().min(5, {
      message: "Email kiritish majburiy",
   }),
   password: z.string().min(1, {
      message: "Parolni kiritish majburiy",
   })
});

export const UserSchema = z.object({
   name: z.string().min(3, {
      message: "Ism kiritish majburiy",
   }),
   email: z
      .string()
      .min(1, {
         message: "Email to'liq kiritilmadi",
      })
      .email("Iltimos email kiriting"),
   password: z
      .string()
      .min(8, {
         message: "Parol minimum 8 simvoldan iborat bo'lishi kerak"
      })
      .max(32, {
         message: "Parol minimum 32 simvoldan iborat bo'lishi kerak"
      })
});

export const BranchSchema = z.object({
   name: z.string().min(10, {
      message: "Filial nomini kiritish majburiy"
   }),
   short_name: z.string().min(3, {
      message: "3 ta belgidan ko'p kiriting"
   }),
   code: z.number(),
   committee: z.string().min(5),
   contract: z.string().min(5),
   address: z.string().min(10, {
      message: "Manzilni to'liq kiriting"
   }),
   bank_details: z.string().min(7, {
      message: "Bank rekvizitlarini to'liq kiriting"
   }),
   itn: z.string(),
   phone: z.array(z.string()),
   city: z.string(),
   judge: z.string(),
   limit: z.number().min(50_000_000, {
      message: "Filial limiti 50 mlndan katta bo'lishi kerak"
   })

})

export const ClientSchema = z.object({
   branch_id: z.string(),
   open_date: z.string(),
   close_date: z.string(),
   is_resident: z.boolean(),
   firstname: z.string().min(1, {
      message: "To'ldirish majburiy"
   }),
   surname: z.string().min(1, {
      message: "To'ldirish majburiy"
   }),
   lastname: z.string().min(1, {
      message: "To'ldirish majburiy"
   }),
   gender: z.string(),
   birth_date: z.string(),
   job: z.string(),
   addresses: z.array(
      z.object({
         status: z.boolean(),
         region_id: z.string(),
         district_id: z.string(),
         address: z.string().min(5, {
            message: "Manzilni to'liq kiriting"
         }),
      })
   ),
   nationality: z.string(),
   phones: z.array(
      z.object({
         title: z.string(),
         phone: z.string().refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
         status: z.boolean()
      })
   ),
   pinfl: z
      .string(
         {
            required_error: "JSHSHIR maydonini to'ldirish majburiy",
         }
      )
      .length(14, {
         message: "JSHSHIR 14 raqamdan iborat bo'lishi kerak!"
      }),
   passport: z.object({
      type: z.string(),
      series: z.string(),
      number: z.string(),
      registration_date: z.string(),
      expiration_date: z.string(),
      personal_identification: z.string(),
      registration_place: z.string(),
   }),
})

export const ClientUpdateSchema = z.object({
   branch_id: z.string(),
   code: z.number(),
   open_date: z.string(),
   close_date: z.string(),
   is_resident: z.boolean(),
   firstname: z.string().min(1, {
      message: "To'ldirish majburiy"
   }),
   surname: z.string().min(1, {
      message: "To'ldirish majburiy"
   }),
   lastname: z.string().min(1, {
      message: "To'ldirish majburiy"
   }),
   gender: z.string(),
   birth_date: z.string(),
   job: z.string(),
   nationality: z.string(),
   pinfl: z.string().min(14, {
      message: "To'liq kiriting"
   }),
})

export const ClientCheckSchema = z.object({
   jshshir: z
      .string(
         {
            required_error: "JSHSHIR maydonini to'ldirish majburiy",
         }
      )
      .min(14, {
         message: "JSHSHIR 14 raqamdan iborat bo'lishi kerak!"
      })
      .max(14, {
         message: "JSHSHIR 14 raqamdan iborat bo'lishi kerak!"
      })
      .transform((val) => {
         if (val.length !== 14) throw new Error("JSHSHIR 14 raqamdan iborat bo'lishi kerak!")
         return parseInt(val, 10)
      }),
   passport_details: z
      .string()
      .min(9, {
         message: "Passport seriya va raqam formasi xato kiritildi",
      })
      .max(10, {
         message: "Passport seriya va raqam formasi xato kiritildi",
      })
});

export const GroupSchema = z.object({
   branch_id: z.string(),
   name: z.string(),
   code: z.string()
})

export const PhoneFormSchema = z.object({
   title: z.string(),
   phone: z.string().refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
   status: z.boolean()
})

export const AddressFormSchema = z.object({
   region_id: z.string(),
   district_id: z.string(),
   address: z.string(),
   status: z.boolean()
})

export const PassportFormSchema = z.object({
   type: z.string(),
   series: z.string(),
   number: z.string(),
   registration_date: z.string(),
   expiration_date: z.string(),
   personal_identification: z.string(),
   registration_place: z.string(),
})