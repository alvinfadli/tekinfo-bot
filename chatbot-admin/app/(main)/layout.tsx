import { Footer } from "@/components/Footer";
import "../globals.css";
import { Navbar } from "@/components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full">
      <Navbar />
      <div className="mx-auto min-h-screen w-10/12 px-2">{children}</div>
      <Footer />
    </div>
  );
}
