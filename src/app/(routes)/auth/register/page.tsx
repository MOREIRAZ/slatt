import type { Metadata } from "next";
import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "SLATT MUSIC - REGISTRAR",
  description: "Crie a tua conta e começa a construir sua presença digital.",
};

export default function RegisterPage() {
  return (
    <div className=" flex h-screen items-center justify-center">
      <Link href={"/"}>
        <Button variant="secondary" className=" absolute top-2 left-2">
          <ArrowLeft />
          voltar ao ínicio
        </Button>
      </Link>
      <RegisterForm />
    </div>
  );
}
