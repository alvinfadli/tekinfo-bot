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

type FormValues = {
  file: FileList;
};

interface UploadFormProps {
  onSuccess: () => void;
}

export function UploadForm({ onSuccess }: UploadFormProps) {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add RAG Document</DialogTitle>
          <DialogDescription>
            Upload a document to add knowledge for Tekinfo-Bot
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="upload_file" className="text-left">
              Upload File (PDF)
            </Label>
            <Input
              placeholder="Upload file"
              {...register("file", { required: true })}
              id="upload_file"
              type="file"
              accept="application/pdf"
              className="mb-1"
            />
            {/* <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              placeholder="Type your file description here."
              id="description"
              {...register("description", { required: true })}
              rows={5}
            />
            {errors.description && (
              <span className="error">Text area is required</span>
            )} */}
            <DialogFooter className="flex gap-1 pt-4 sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Submit"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
