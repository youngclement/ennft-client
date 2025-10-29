import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AssetBurnButton from "@/components/elearning/AssetBurnButton";
import Image from "next/image";
import { getUmi } from "@/lib/solana/umi";
import { fetchAssetsByOwner } from "@metaplex-foundation/mpl-core";

type AssetPreview = {
  address: string;
  name: string;
  uri: string;
  image?: string;
};

async function loadMintedAssets(): Promise<AssetPreview[]> {
  const umi = getUmi();
  const owner = umi.identity.publicKey;
  const assets = await fetchAssetsByOwner(umi, owner, {
    skipDerivePlugins: false,
  });

  const previews: AssetPreview[] = [];
  for (const asset of assets) {
    const address = asset.publicKey.toString();
    const name = asset.name ?? "Unnamed Asset";
    const uri = asset.uri ?? "";
    let image: string | undefined;
    try {
      if (uri) {
        const res = await fetch(uri, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          image = json.image;
        }
      }
    } catch (_) {
      // ignore metadata fetch errors
    }
    previews.push({ address, name, uri, image });
  }
  return previews;
}

export default async function Page() {
  const assets = await loadMintedAssets();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Course NFTs</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Showing all MPL Core assets minted to the current fee payer wallet.
      </p>

      {assets.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No NFTs minted yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((a) => (
            <Card key={a.address} className="overflow-hidden">
              {a.image ? (
                <div className="relative w-full h-40">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-muted" />
              )}
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-medium truncate max-w-[65%]"
                    title={a.name}
                  >
                    {a.name}
                  </span>
                  <Badge variant="secondary">MPL Core</Badge>
                </div>
                <div className="text-xs text-muted-foreground break-all">
                  <div>Asset: {a.address}</div>
                  {a.uri && (
                    <div className="mt-1">
                      Metadata:{" "}
                      <a
                        href={a.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {a.uri}
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <AssetBurnButton assetAddress={a.address} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
