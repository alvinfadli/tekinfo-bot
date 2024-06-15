import RagDashboard from "@/app/(main)/components/RagDashboard";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    revalidatePath("/login", "page");
    redirect("/login");
  }

  return (
    <div>
      <RagDashboard />
    </div>
  );
}
