"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AssetBurnButton({
  assetAddress,
}: {
  assetAddress: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBurn = async () => {
    if (loading) return;
    const confirmBurn = window.confirm(
      "Are you sure you want to burn this NFT? This action is irreversible."
    );
    if (!confirmBurn) return;

    setLoading(true);
    try {
      const res = await fetch("/api/nft/burn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetAddress }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Burn failed");
      }
      // Refresh the page to update the NFT list
      router.refresh();
    } catch (e: any) {
      alert(e?.message || "Unable to burn NFT, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleBurn}
      disabled={loading}
    >
      {loading ? "Burning…" : "Burn NFT"}
    </Button>
  );
}
