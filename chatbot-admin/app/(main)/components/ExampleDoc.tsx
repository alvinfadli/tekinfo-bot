// FileTable.tsx
"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { FileCheck } from "lucide-react";

export default function ExampleDoc() {
  const supabase = createClient();

  const inspectItem = () => {
    const { data } = supabase.storage
      .from("example")
      .getPublicUrl("example.pdf");
    window.open(`${data.publicUrl}`, "_blank");
  };

  return (
    <Button onClick={inspectItem} asChild>
      <div className="group inline-flex rounded-lg border border-slate-400 bg-slate-100 px-5 py-3 shadow-sm hover:bg-slate-200">
        <div className="flex gap-2">
          <FileCheck
            size={20}
            className="text-red-500 group-hover:text-red-700"
          />
          <h1 className="text-sm text-slate-600">Doc Example V1</h1>
        </div>
      </div>
    </Button>
  );
}
