"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader() {
  const pathname = usePathname();
  
  const getTitle = () => {
    switch (pathname) {
      case "/induction":
        return "Site Induction Form";
      case "/daily-login":
        return "Daily Site Log";
      case "/materials-register":
        return "Materials Register Form";
      default:
        return "Site Entry Pro";
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold text-primary">{getTitle()}</h1>
        </div>
      </div>
    </header>
  );
}
