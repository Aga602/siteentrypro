"use server";

import { z } from "zod";
import { inductionSchema, dailyLoginSchema, materialsSchema } from "./types";

// This is a placeholder function. In a real application, this would
// interact with an external API, like Google Apps Script, to write to a Google Sheet.
async function sendToGoogleSheets(data: any, sheetName: string) {
  console.log(`Sending data to Google Sheet "${sheetName}":`, data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // In a real app, you would have error handling based on the API response.
  return { success: true };
}

export async function submitInduction(prevState: any, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Manual parsing because Zod doesn't handle FormData files directly with `parse`
    const parsedData = {
      name: data.name,
      phone: data.phone,
      dateOfBirth: new Date(data.dateOfBirth as string),
      address: data.address,
      drivingLicenseNumber: data.drivingLicenseNumber,
      whiteCardNumber: data.whiteCardNumber,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      drivingLicenseFront: data.drivingLicenseFront,
      drivingLicenseBack: data.drivingLicenseBack,
      whiteCardFront: data.whiteCardFront,
      whiteCardBack: data.whiteCardBack,
    };

    // We can't validate the files here as they are not available directly.
    // Basic validation happens on the client.
    // A more robust solution might involve a file upload service.

    // For demonstration, we'll log the form data.
    // In a real app, you would upload files to storage and save the URLs.
    console.log("Received Induction Form Data:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    // await sendToGoogleSheets(parsedData, "Induction");

    return { message: "Induction form submitted successfully.", status: "success" };
  } catch (e) {
    console.error(e);
    return { message: "Failed to submit induction form.", status: "error" };
  }
}

export async function submitDailyLogin(data: z.infer<typeof dailyLoginSchema>) {
  try {
    const validatedData = dailyLoginSchema.parse(data);
    await sendToGoogleSheets(validatedData, "DailyLogins");
    return { message: "Daily log submitted successfully.", status: "success" };
  } catch (e) {
    console.error(e);
    return { message: "Failed to submit daily log.", status: "error" };
  }
}

export async function submitMaterialsRegister(prevState: any, formData: FormData) {
  try {
    console.log("Received Materials Register Form Data:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // await sendToGoogleSheets(Object.fromEntries(formData.entries()), "MaterialsRegister");

    return { message: "Materials register submitted successfully.", status: "success" };
  } catch (e) {
    console.error(e);
    return { message: "Failed to submit materials register.", status: "error" };
  }
}
