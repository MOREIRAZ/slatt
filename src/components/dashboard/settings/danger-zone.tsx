"use client";

import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DangerZone() {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Introduz DELETE para confirmar.");
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch("/api/user/account", {
        method: "DELETE",
      });
      if (response.ok) {
        await fetch("/api/auth/logout", { method: "POST" });
        toast.success("Account deleted successfully");
        router.push("/home");
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border-red-200">
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h2 className="text-xl font-semibold ">Atenção</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 border  rounded-lg ">
          <h3 className="font-medium text-red-900 mb-2">Eliminar Conta</h3>
          <p className="text-sm text-red-700 mb-4">
            Eliminar permanentemente a tua conta e todos os dados associados? Esta ação não pode ser desfeita.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminar Conta</AlertDialogTitle>
                <AlertDialogDescription>
                  Isto eliminará permanentemente a tua conta e todos os dados associados, incluindo:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Todos os LinkHubs e links</li>
                    <li>Dados analíticos</li>
                    <li>Informações do perfil</li>
                    <li>Configurações da Conta</li>
                  </ul>
                  <br />
                  Esta ação não pode ser anulada. Introduz <strong>DELETE</strong> para confirmar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <Label htmlFor="delete-confirmation">
                  Introduz DELETE para confirmar.
                </Label>
                <Input
                  id="delete-confirmation"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="mt-2"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== "DELETE" || isDeleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? "A Eliminar..." : "Eliminar Conta"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
