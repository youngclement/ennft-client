import { NextResponse } from "next/server";
import { getUmi } from "@/lib/solana/umi";
import { fetchAssetsByOwner } from "@metaplex-foundation/mpl-core";

export const runtime = "nodejs";

function extractCourseIdFromUri(uri: string | null | undefined): string | null {
  if (!uri) return null;
  try {
    const u = new URL(uri);
    const parts = u.pathname.split("/");
    const last = parts[parts.length - 1];
    return last || null;
  } catch {
    // Fallback simple split if not a valid URL
    const parts = String(uri).split("/");
    const last = parts[parts.length - 1];
    return last || null;
  }
}

export async function GET() {
  try {
    const umi = getUmi();
    const owner = umi.identity.publicKey;
    const assets = await fetchAssetsByOwner(umi, owner, {
      skipDerivePlugins: false,
    });

    const minted = assets.map((asset) => ({
      assetAddress: asset.publicKey.toString(),
      uri: asset.uri ?? "",
      name: asset.name ?? "",
      courseId: extractCourseIdFromUri(asset.uri) ?? "",
    }));

    return NextResponse.json({ owner: owner.toString(), minted });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to load minted NFTs" },
      { status: 500 }
    );
  }
}
