import { PageHeader } from "@/components/page-header";

export default function FormsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <PageHeader />
      <main className="p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
