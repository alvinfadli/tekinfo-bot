"use client";
import { signOut } from "@/utils/signOut";
import { Button } from "./ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleSignOut() {
    try {
      setIsLoading(true);
      await signOut();
      setIsLoading(false);
    } catch (error) {}
  }

  return (
    <>
      <Button
        className="hover:bg-slate-100"
        variant={"ghost"}
        onClick={handleSignOut}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing Out
          </>
        ) : (
          <>
            <ExitIcon className="mr-2 h-4 w-4" />
            Sign Out
          </>
        )}
      </Button>
    </>
  );
};

export default SignOutButton;
