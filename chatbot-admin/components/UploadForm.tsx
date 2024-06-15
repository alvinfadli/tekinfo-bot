"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type FormValues = {
  file: FileList;
};

export function UploadForm() {
  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const selectedFile = data.file[0];
    try {
      await supabase.storage
        .from("rag-data")
        .upload(`${selectedFile.name}`, selectedFile, {
          cacheControl: "3600",
          upsert: false,
        });
      reset();
      router.replace("/");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-3">
        <Input
          placeholder="Upload file"
          {...register("file", { required: true })}
          id="upload_file"
          type="file"
          accept="application/pdf"
          className="mb-1 bg-white"
        />
      </div>
      <div className="flex justify-end">
        <Button disabled={isSubmitting} type="submit" className="">
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
