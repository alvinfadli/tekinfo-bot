// FileTable.tsx
"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DownloadIcon, EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { formatDatetime } from "@/utils/formatDatetime";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

interface FileTableProps {
  fetchData: () => Promise<void>;
  ragData: any[];
}

export default function FileTable({ fetchData, ragData }: FileTableProps) {
  const supabase = createClient();
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteItem = async (fileName: string) => {
    try {
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [fileName]: true,
      }));
      await supabase.storage.from("rag-data").remove([`${fileName}`]);
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [fileName]: false,
      }));
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const inspectItem = (fileName: string) => {
    const { data } = supabase.storage
      .from("rag-data")
      .getPublicUrl(`${fileName}`);
    window.open(`${data.publicUrl}`, "_blank");
  };

  return (
    <Table>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="min-w-[240px]">Name</TableHead>
          <TableHead>Uploaded At</TableHead>
          <TableHead>File Size</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ragData ? (
          ragData.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="min-w-[240px] font-medium">
                {item.name}
              </TableCell>
              <TableCell>{formatDatetime(item.created_at)}</TableCell>
              <TableCell>{item.metadata.size}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  variant={"secondary"}
                  className="hover:bg-neutral-500 hover:text-white"
                  onClick={() => inspectItem(item.name)}
                >
                  <EyeOpenIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={"destructive"}
                  className="hover:bg-red-800"
                  onClick={() => deleteItem(item.name)}
                >
                  {loadingMap[item.name] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <TrashIcon className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <p>No Data Available</p>
        )}
      </TableBody>
    </Table>
  );
}
