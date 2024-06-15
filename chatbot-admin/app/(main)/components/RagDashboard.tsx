"use client";
import { useEffect, useState } from "react";
import FileTable from "../../../components/FileTable";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RagDashboard() {
  const supabase = createClient();
  const [ragData, setRagData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await supabase.storage.from("rag-data").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
    if (res.data) {
      setRagData(res.data);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-semibold">Documents</h1>
        {/* <UploadForm onSuccess={fetchData} /> */}
        <Button asChild>
          <Link href={"/upload-document"}>Add</Link>
        </Button>
      </div>
      <div className="my-3 flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="overflow-hidden rounded-lg border">
              <FileTable fetchData={fetchData} ragData={ragData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
