import SignInForm from "@/components/SignInForm";
import Image from "next/image";
import TekinfoLogo from "../../../public/logo-ti.webp";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Login() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-10/12 rounded-md border p-5 text-center shadow-md sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-2/12">
        <div className="flex justify-center py-5">
          <Image
            src={TekinfoLogo}
            width={50}
            height={50}
            alt="Logo Teknologi Informasi"
          />
        </div>
        <h1 className="pb-3 text-xl font-semibold">Sign in</h1>
        <p className="mb-5 text-sm">
          Welcome to Information Technology Department&apos;s Chatbot data
          management website
        </p>
        <SignInForm />
      </div>
    </div>
  );
}
