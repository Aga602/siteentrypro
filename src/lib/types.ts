import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
  .any()
  .refine((files) => files?.length == 1, "File is required.")
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  );

export const inductionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number."),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  address: z.string().min(5, "Address must be at least 5 characters."),
  drivingLicenseNumber: z.string().min(1, "Driving license number is required."),
  drivingLicenseFront: fileSchema,
  drivingLicenseBack: fileSchema,
  whiteCardNumber: z.string().min(1, "White card number is required."),
  whiteCardFront: fileSchema,
  whiteCardBack: fileSchema,
  emergencyContactName: z.string().min(2, "Emergency contact name is required."),
  emergencyContactPhone: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number."),
});

export const dailyLoginSchema = z.object({
  checkInTime: z.string(),
  checkInLocation: z.string(),
  checkOutTime: z.string(),
  checkOutLocation: z.string(),
});

export const materialsSchema = z.object({
  dateTime: z.date({ required_error: "Date and time are required." }),
  vehicleRegistration: z.string().min(1, "Vehicle registration is required."),
  personnelName: z.string().min(2, "Personnel name is required."),
  grossWeight: z.string().min(1, "Gross weight is required."),
  vehiclePhotoFront: fileSchema,
  vehiclePhotoBack: fileSchema,
  materialDetails: z.string().min(10, "Material details must be at least 10 characters."),
});

export type InductionSchema = z.infer<typeof inductionSchema>;
export type DailyLoginSchema = z.infer<typeof dailyLoginSchema>;
export type MaterialsSchema = z.infer<typeof materialsSchema>;
