export interface PaginationType {
   page: number,
   limit: number,
   total_rows: number,
   total_pages: number
}

export interface UserType {
   name?: string
   email: string
   password: string
}

export interface BranchType {
   name: string
   short_name: string
   code: number
   contract: string
   committee: string
   address: string
   bank_details: string
   itn: string
   phone: string[],
   city: string,
   judge: string,
   limit: number
}

export interface ClientListType {
   id: string,
   is_resident: boolean,
   code: number,
   firstname: string,
   surname: string,
   lastname: string,
   full_name: string,
   short_name: string,
   branch: {
      id: string,
      name: string,
      code: number
   },
   open_date: string,
   close_date: string,
   created_at: string
}

export interface ClientType {
   branch_id: string,
   branch?: {
      id: string,
      name: string,
      code: number
   },
   open_date: string,
   close_date: string,
   is_resident: boolean,
   firstname: string,
   surname: string,
   lastname: string,
   gender: string,
   birth_date: string,
   job: string,
   addresses: [
      {
         status: boolean,
         region_id: string,
         district_id: string,
         address: string,
      }
   ],
   nationality: string,
   phones: [
      {
         title: string,
         phone: string,
         status: boolean
      }
   ],
   pinfl: string,
   passport: {
      type: string,
      series: string,
      number: string,
      registration_date: string,
      expiration_date: string,
      registration_place: string,
      personal_identification: string,
      files: string[],
   },
   files: string[]
}

export interface PhoneType {
   id?: string;
   title: string;
   phone: string;
   status: boolean;
}

export interface AddressType {
   id?: string;
   address: string;
   region_id: string;
   district_id: string;
   status: boolean;
}

export interface PassportType {
   id?: string,
   fileable_type: string,
   fileable_id: string,
   type: string,
   series: string,
   number: string,
   registration_date: string,
   registration_place: string,
   expiration_date: string,
   personal_identification: string,
   images: string[]
   files?: any[]
}

export interface UploadedFile {
   id: string;
   name: string;
   url: string;
   type: string;
   size: number;
   file: File;
}

export interface GroupType {
   branch_id: string;
   name: string;
   code: string;
}

export interface GroupListType {
   id: string,
   name: string,
   code: string,
   created_at: string,
   updated_at: string
}