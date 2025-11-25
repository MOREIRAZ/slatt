"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LinkIconUploader } from "@/components/uploadthing/upload-button";

export default function EditLinkForm({ link, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({ ...link });
  const [loading, setLoading] = useState(false);

  const updateLink = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar");

      toast.success("Link atualizado!");
      onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateLink} className="space-y-4">
      <div>
        <Label>Título</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <Label>URL</Label>
        <Input
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
      </div>

      <div>
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

<div className="space-y-2">
  <Label>Icon</Label>

  <LinkIconUploader
    onUploaded={(url) => setFormData((prev) => ({ ...prev, icon: url }))}
  />

  <Input value={formData.icon} readOnly className="mt-2" />
</div>


      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "A atualizar..." : "Atualizar"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
