"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dailyLoginSchema, type DailyLoginSchema } from "@/lib/types";
import { submitDailyLogin } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Clock, LogIn, LogOut } from "lucide-react";

type GeoLocation = {
  lat: number;
  long: number;
} | null;

export function DailyLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [checkInData, setCheckInData] = useState<{ time: string; location: string } | null>(null);
  const [checkOutData, setCheckOutData] = useState<{ time: string; location: string } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const form = useForm<DailyLoginSchema>({
    resolver: zodResolver(dailyLoginSchema),
  });

  const getGeoLocation = (): Promise<GeoLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          () => {
            reject("Unable to retrieve your location.");
          }
        );
      }
    });
  };

  const handleCheckIn = async () => {
    setGeoError(null);
    try {
      const location = await getGeoLocation();
      const time = new Date().toISOString();
      if (location) {
        const locationString = `${location.lat.toFixed(5)}, ${location.long.toFixed(5)}`;
        setCheckInData({ time, location: locationString });
        form.setValue("checkInTime", time);
        form.setValue("checkInLocation", locationString);
      }
    } catch (error: any) {
      setGeoError(error);
      toast({ title: "Geolocation Error", description: error, variant: "destructive" });
    }
  };
  
  const handleCheckOut = async () => {
    if (!checkInData) {
        toast({ title: "Error", description: "You must check in before checking out.", variant: "destructive"});
        return;
    }
    setGeoError(null);
    try {
      const location = await getGeoLocation();
      const time = new Date().toISOString();
      if (location) {
        const locationString = `${location.lat.toFixed(5)}, ${location.long.toFixed(5)}`;
        setCheckOutData({ time, location: locationString });
        form.setValue("checkOutTime", time);
        form.setValue("checkOutLocation", locationString);
      }
    } catch (error: any) {
      setGeoError(error);
      toast({ title: "Geolocation Error", description: error, variant: "destructive" });
    }
  };
  
  const onSubmit: SubmitHandler<DailyLoginSchema> = async (data) => {
    setIsSubmitting(true);
    const result = await submitDailyLogin(data);
    if (result.status === "success") {
      toast({
        title: "Success",
        description: result.message,
      });
      form.reset();
      setCheckInData(null);
      setCheckOutData(null);
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  useEffect(() => {
    if(checkOutData) {
        form.handleSubmit(onSubmit)();
    }
  }, [checkOutData, form]);

  return (
    <Card className="w-full printable-content print:shadow-none print:border-none">
      <CardHeader>
        <CardTitle>Daily Log</CardTitle>
        <CardDescription>Tap to check in and out from the site. Location will be recorded automatically.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Button
                type="button"
                className="h-24 text-lg"
                onClick={handleCheckIn}
                disabled={!!checkInData}
            >
                <LogIn className="mr-2 h-6 w-6" /> Check In
            </Button>
            <Button
                type="button"
                className="h-24 text-lg"
                variant="outline"
                onClick={handleCheckOut}
                disabled={!checkInData || !!checkOutData}
            >
                <LogOut className="mr-2 h-6 w-6" /> Check Out
            </Button>
        </div>

        {checkInData && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Check-In Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground" /> Time: {new Date(checkInData.time).toLocaleString()}</p>
              <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> Location: {checkInData.location}</p>
            </CardContent>
          </Card>
        )}
        
        {checkOutData && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Check-Out Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground" /> Time: {new Date(checkOutData.time).toLocaleString()}</p>
              <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> Location: {checkOutData.location}</p>
            </CardContent>
          </Card>
        )}

        {geoError && <p className="text-sm font-medium text-destructive">{geoError}</p>}
      </CardContent>
      <CardFooter className="print-hidden">
        <Button type="button" onClick={handlePrint} disabled={!checkInData && !checkOutData} variant="secondary">
          Download Log as PDF
        </Button>
        {isSubmitting && <Loader2 className="ml-4 h-4 w-4 animate-spin" />}
      </CardFooter>
    </Card>
  );
}
