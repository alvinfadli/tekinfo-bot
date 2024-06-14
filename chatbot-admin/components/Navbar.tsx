"use client";
import * as React from "react";
import TekinfoLogo from "../public/logo-ti-small.webp";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

export function Navbar() {
  return (
    <div className="mb-5 flex w-full border-b bg-slate-50 py-5">
      <div className="mx-auto flex w-10/12 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={TekinfoLogo}
            width={30}
            height={29}
            alt="Logo Teknologi Informasi"
          />
          <h1 className="font-semibold">Tekinfo-Bot</h1>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
}
