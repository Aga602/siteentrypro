"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { materialsSchema, type MaterialsSchema } from "@/lib/types";
import { submitMaterialsRegister } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { FileInput } from "../ui/file-input";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
  status: "",
};

export function MaterialsRegisterForm() {
  const [state, formAction] = useFormState(submitMaterialsRegister, initialState);
  const { toast } = useToast();

  const form = useForm<MaterialsSchema>({
    resolver: zodResolver(materialsSchema),
    defaultValues: {
      vehicleRegistration: "",
      personnelName: "",
      grossWeight: "",
      materialDetails: "",
    },
  });

  const { formState, handleSubmit } = form;

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: "Success",
        description: state.message,
      });
      form.reset();
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  const onFormSubmit = (data: MaterialsSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0]);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    });
    formAction(formData);
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8 printable-content">
        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Vehicle & Material Details</CardTitle>
            <CardDescription>Log the details of the vehicle entering the site.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="dateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date & Time of Entry</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleRegistration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="XYZ 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personnelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Personnel in Vehicle</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grossWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gross Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="materialDetails"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Details of Materials in Truck</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 100x cement bags, 50x steel rods..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Vehicle Photos</CardTitle>
            <CardDescription>Upload photos of the vehicle (front and back).</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="vehiclePhotoFront"
                render={({ field }) => (
                    <FormItem>
                        <FormControl><FileInput label="Vehicle Photo (Front)" {...form.register("vehiclePhotoFront")} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="vehiclePhotoBack"
                render={({ field }) => (
                    <FormItem>
                        <FormControl><FileInput label="Vehicle Photo (Back)" {...form.register("vehiclePhotoBack")} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
          </CardContent>
        </Card>

        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Previous Entry Record</CardTitle>
            <CardDescription>Immediate previous record of this vehicle entering or exiting the site.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No previous entry found for this vehicle today.</p>
            {/* In a real app, this would be populated with data */}
          </CardContent>
          <CardFooter className="flex-col items-start gap-4 print-hidden">
             <div className="flex gap-2">
                <Button type="submit" disabled={formState.isSubmitting}>
                  {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Register
                </Button>
                <Button type="button" variant="secondary" onClick={handlePrint}>Download as PDF</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
