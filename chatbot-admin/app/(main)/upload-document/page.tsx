import { UploadForm } from "@/components/UploadForm";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ExampleDoc from "../components/ExampleDoc";

export default async function UploadDocument() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    revalidatePath("/login", "page");
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full md:w-3/4">
      <h1 className="font-semibold">Upload Document</h1>
      <div className="my-5 flex w-full rounded-md border border-slate-200 bg-slate-50 p-5">
        <UploadForm />
      </div>
      <div className="mx-2">
        <h1 className="font-semibold underline underline-offset-4">
          Document Structure Guide
        </h1>
        <ol className="mt-5 list-decimal space-y-2 px-5">
          <li>
            Title And Metadata
            <ul className="list-disc px-5">
              <li>
                Each document must start with a clear and concise title that
                reflects the content of the document.
              </li>
              <li>
                Include metadata such as author, date of creation, and keywords
                for easier retrieval.{" "}
                <span className="text-green-400">(optional)</span>
              </li>
            </ul>
          </li>
          <li>
            Content Organization
            <ul className="list-disc px-5">
              <li>
                The document should be organized into distinct sections, each
                focusing on a single context or topic.
              </li>
              <li>
                Each section must contain exactly one paragraph per context.
              </li>
            </ul>
          </li>
          <li>
            Paragraph Formatting
            <ul className="list-disc px-5">
              <li>
                Each paragraph should be concise, ideally between 50 to 150
                words.
              </li>
              <li>
                Paragraphs should be self-contained and contextually complete,
                providing sufficient information on the topic without relying on
                external references.
              </li>
              <li>
                There must be one blank line between each paragraph to clearly
                delineate contexts.
              </li>
            </ul>
          </li>
          <li>
            Language and Style
            <ul className="list-disc px-5">
              <li>
                Use clear and unambiguous language suitable for the intended
                audience.
              </li>
              <li>
                Avoid jargon unless it is defined within the paragraph or
                commonly understood by the target audience.
              </li>
              <li>
                Ensure proper grammar, punctuation, and spelling throughout the
                document.
              </li>
            </ul>
          </li>
          <li>
            Content Requirements
            <ul className="list-disc px-5">
              <li>
                Information must be accurate, up-to-date, and relevant to the
                topic.
              </li>
              <li>
                Each paragraph should aim to answer a specific question or
                address a particular aspect of the context.
              </li>
              <li>
                Include any necessary explanations, examples, or evidence within
                the paragraph to enhance understanding.
              </li>
            </ul>
          </li>
        </ol>
        <h1 className="mb-3 mt-5 font-semibold underline underline-offset-4">
          Document Example :
        </h1>
        <ExampleDoc />
      </div>
    </div>
  );
}
