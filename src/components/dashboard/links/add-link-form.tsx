"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LinkIconUploader } from "@/components/uploadthing/upload-button";


export default function AddLinkForm({ linkHubId, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/linkhubs/${linkHubId}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erro ao criar link");

      toast.success("Link criado!");
      onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Título</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>URL</Label>
        <Input
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Descrição</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

<div>
  <Label>Icon</Label>

  {/* UploadThing uploader */}
  <LinkIconUploader
    onUploaded={(url) => setFormData({ ...formData, icon: url })}
  />

  {/* Campo apenas leitura */}
  <Input value={formData.icon} readOnly className="mt-2" />
</div>


      <Button type="submit" disabled={loading}>
        {loading ? "A criar..." : "Criar Link"}
      </Button>
    </form>
  );
}
