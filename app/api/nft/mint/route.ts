import { NextResponse } from "next/server";
import { getUmi } from "@/lib/solana/umi";
import { generateSigner, publicKey, sol } from "@metaplex-foundation/umi";
import { create, fetchAssetsByOwner } from "@metaplex-foundation/mpl-core";
import { mockCourses } from "@/lib/data/mock-courses";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId, owner } = body ?? {};
    if (!courseId) {
      return NextResponse.json(
        { error: "courseId is required" },
        { status: 400 }
      );
    }

    const umi = getUmi();
    // Devnet airdrop fallback to avoid insufficient funds during simulation.
    try {
      const endpoint = process.env.SOLANA_RPC_ENDPOINT ?? "";
      if (endpoint.includes("devnet")) {
        await umi.rpc.airdrop(umi.identity.publicKey, sol(1));
        // Re-check balance after airdrop to ensure we can pay fees.
        try {
          const bal = await umi.rpc.getBalance(umi.identity.publicKey);
          const lamports =
            bal && (bal as any).basisPoints
              ? Number((bal as any).basisPoints)
              : 0;
          if (!Number.isFinite(lamports) || lamports <= 0) {
            return NextResponse.json(
              {
                error: "Insufficient funds for fee payer after airdrop",
                identity: umi.identity.publicKey.toString(),
                endpoint,
                hint: "Devnet faucet may be rate-limited. Retry or fund the identity.",
              },
              { status: 400 }
            );
          }
        } catch (_) {
          // If balance check fails, proceed and rely on transaction logs on failure.
        }
      }
    } catch (_) {
      // Ignore airdrop errors; proceed to mint and surface detailed logs if it fails.
    }
    const assetSigner = generateSigner(umi);

    const url = new URL(req.url);
    const base = `${url.protocol}//${url.host}`;
    const uri = `${base}/api/nft/metadata/${courseId}`;

    const course = mockCourses.find((c) => String(c.id) === String(courseId));
    const assetName = course?.title ? course.title : `Course NFT #${courseId}`;

    // Prevent duplicate mint for the same course by checking existing assets
    try {
      const ownerPk = owner ? publicKey(String(owner)) : umi.identity.publicKey;
      const ownedAssets = await fetchAssetsByOwner(umi, ownerPk, {
        skipDerivePlugins: false,
      });
      const alreadyMinted = ownedAssets.some((a) => {
        const aUri = a.uri ?? "";
        if (aUri === uri) return true;
        const seg = String(aUri).split("/").pop();
        return seg && String(seg) === String(courseId);
      });
      if (alreadyMinted) {
        return NextResponse.json(
          {
            error: "Already minted for this course",
            courseId,
            uri,
          },
          { status: 409 }
        );
      }
    } catch (_) {
      // If check fails, proceed; mint will attempt anyway
    }

    const args: any = {
      asset: assetSigner,
      name: assetName,
      uri,
      //owner: publicKey('11111111111111111111111111111111'), //optional to mint into a different wallet
    };

    if (owner) {
      try {
        args.owner = publicKey(String(owner));
      } catch (e) {
        // ignore invalid owner, will mint to default identity
      }
    }

    const result = await create(umi, args).sendAndConfirm(umi);

    return NextResponse.json({
      assetAddress: assetSigner.publicKey.toString(),
      signature: (result as any)?.signature ?? null,
      uri,
    });
  } catch (e: any) {
    let logs: string[] | null = null;
    try {
      if (typeof e?.getLogs === "function") {
        logs = await e.getLogs();
      } else if (Array.isArray(e?.logs)) {
        logs = e.logs;
      }
    } catch (_) {
      // swallow
    }
    return NextResponse.json(
      { error: e?.message ?? "Mint failed", logs },
      { status: 500 }
    );
  }
}
