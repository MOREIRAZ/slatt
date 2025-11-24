import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SLATT MUSIC - Login",
  description: "Faz login na tua conta.",
};

export default function LoginPage() {
  return (
    <div className=" flex h-screen items-center justify-center">
      <Link href={"/"}>
        <Button variant="secondary" className=" absolute top-2 left-2">
          <ArrowLeft />
          voltar ao ínicio
        </Button>
      </Link>
      <LoginForm />
    </div>
  );
}
