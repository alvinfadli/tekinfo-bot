"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    revalidatePath("/login", "page");
    redirect("/login");
  } else {
    console.log("Error logout : ", error);
  }
}
