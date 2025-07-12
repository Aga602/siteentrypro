import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, LogIn, Truck, ArrowRight } from "lucide-react";

const forms = [
  {
    title: "Site Induction",
    description: "For individuals working on site. Complete this form before your first day.",
    link: "/induction",
    icon: <UserCheck className="h-8 w-8 text-primary" />,
  },
  {
    title: "Daily Site Log",
    description: "Log your check-in and check-out times for each day you are on site.",
    link: "/daily-login",
    icon: <LogIn className="h-8 w-8 text-primary" />,
  },
  {
    title: "Materials Register",
    description: "Register all inward and outward materials being transported by vehicle.",
    link: "/materials-register",
    icon: <Truck className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary">Site Entry Pro</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your one-stop solution for site management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {forms.map((form) => (
          <Card key={form.title} className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              {form.icon}
              <CardTitle className="text-2xl font-semibold">{form.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base">{form.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={form.link}>
                  Open Form <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
