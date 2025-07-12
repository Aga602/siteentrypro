"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { inductionSchema, type InductionSchema } from "@/lib/types";
import { submitInduction } from "@/lib/actions";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import { FileInput } from "../ui/file-input";
import { Download, Loader2 } from "lucide-react";

const initialState = {
  message: "",
  status: "",
};

export function InductionForm() {
  const [state, formAction] = useActionState(submitInduction, initialState);
  const { toast } = useToast();

  const form = useForm<InductionSchema>({
    resolver: zodResolver(inductionSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      drivingLicenseNumber: "",
      whiteCardNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
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

  const onFormSubmit = (data: InductionSchema) => {
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
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Please provide your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Licensing & Certification</CardTitle>
            <CardDescription>Provide your license and certification details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="drivingLicenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driving License Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whiteCardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Construction White Card Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="drivingLicenseFront"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><FileInput label="Driving License (Front)" {...form.register("drivingLicenseFront")} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="drivingLicenseBack"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><FileInput label="Driving License (Back)" {...form.register("drivingLicenseBack")} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whiteCardFront"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><FileInput label="White Card (Front)" {...form.register("whiteCardFront")} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="whiteCardBack"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl><FileInput label="White Card (Back)" {...form.register("whiteCardBack")} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
          </CardContent>
        </Card>

        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
            <CardDescription>In case of an emergency, who should we contact?</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Card className="print:shadow-none print:border-none">
          <CardHeader>
            <CardTitle>Safety Documents</CardTitle>
          </CardHeader>
          <CardContent>
             <a href="/SWMS.pdf" download="Safe-Work-Method-Statement.pdf">
                <Button type="button" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Safe Work Method Statement
                </Button>
            </a>
            <p className="text-sm text-muted-foreground mt-2">Please download and read the latest Safe Work Method Statement.</p>
          </CardContent>
           <CardFooter className="flex-col items-start gap-4 print-hidden">
             <div className="flex gap-2">
                <Button type="submit" disabled={formState.isSubmitting}>
                  {formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Induction Form
                </Button>
                <Button type="button" variant="secondary" onClick={handlePrint}>Download as PDF</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
