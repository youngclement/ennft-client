import { NextRequest, NextResponse } from "next/server";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  generateSigner,
  keypairIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { create } from "@metaplex-foundation/mpl-core";
import { ApiResponse } from "@/service/dto/apiReponse";
import { supabase } from "@/lib/supabase";

interface MintCertificateRequest {
  name: string;
  email?: string;
  courseName: string;
  completionDate: string;
  recipientWallet?: string;
  certificateType?: string;
}

interface MintCertificateResponse {
  assetId: string;
  signature: string;
  metadataUri: string;
}

const CERTIFICATE_IMAGE_URL =
  "https://rhiveaobslchlliqharj.supabase.co/storage/v1/object/public/thumbnails/ceirtificate.png";

// JUST for test
const keypairBytes = Uint8Array.from([
  167, 24, 61, 197, 220, 155, 199, 144, 224, 184, 200, 194, 229, 195, 193, 85,
  10, 156, 209, 186, 238, 76, 153, 204, 178, 32, 118, 98, 38, 185, 146, 169,
  191, 203, 171, 60, 155, 253, 202, 222, 127, 108, 111, 232, 180, 84, 144, 238,
  133, 120, 219, 44, 177, 248, 122, 232, 67, 221, 235, 54, 36, 109, 158, 125,
]);
const keypair = Keypair.fromSecretKey(keypairBytes);

export async function POST(request: NextRequest) {
  try {
    const body: MintCertificateRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.courseName || !body.completionDate) {
      return NextResponse.json<ApiResponse<null>>(
        {
          code: 400,
          message:
            "Missing required fields: name, courseName, and completionDate are required",
          result: null,
        },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.CREATOR_WALLET_ADDRESS) {
      console.error("CREATOR_WALLET_ADDRESS environment variable is not set");
      return NextResponse.json<ApiResponse<null>>(
        {
          code: 500,
          message: "Server configuration error: Creator wallet address not configured",
          result: null,
        },
        { status: 500 }
      );
    }

    const umi = createUmi(
      process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com"
    ).use(keypairIdentity(fromWeb3JsKeypair(keypair)));

    // You'll need to set up your wallet/keypair here
    // For production, use environment variables for your private key
    // const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(JSON.parse(process.env.WALLET_PRIVATE_KEY!)));
    // umi.use(keypairIdentity(keypair));

    // Generate certificate image (you can customize this)
    // const certificateImageUrl = await generateCertificateImage(body);

    // Use hardcoded certificate image URL
    const certificateImageUrl = CERTIFICATE_IMAGE_URL;

    // Create metadata JSON
    const metadata = {
      name: `${body.courseName} Certificate - ${body.name}`,
      description: `Certificate of completion for ${body.courseName} course, awarded to ${body.name} on ${body.completionDate}`,
      image: certificateImageUrl,
      attributes: [
        {
          trait_type: "Recipient",
          value: body.name,
        },
        {
          trait_type: "Course",
          value: body.courseName,
        },
        {
          trait_type: "Completion Date",
          value: body.completionDate,
        },
        {
          trait_type: "Certificate Type",
          value: body.certificateType || "Course Completion",
        },
      ],
      properties: {
        category: "certificate",
        creators: [
          {
            address: process.env.CREATOR_WALLET_ADDRESS || "",
            share: 100,
          },
        ],
      },
    };

    // Upload metadata JSON to Supabase storage
    const metadataFileName = `certificate-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.json`;
    const metadataBuffer = Buffer.from(JSON.stringify(metadata, null, 2));

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(`certificates/${metadataFileName}`, metadataBuffer, {
        contentType: "application/json",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading metadata to Supabase:", uploadError);
      return NextResponse.json<ApiResponse<null>>(
        {
          code: 500,
          message: "Failed to upload metadata to storage",
          result: null,
        },
        { status: 500 }
      );
    }

    // Get the public URL for the uploaded metadata
    const { data: urlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(`certificates/${metadataFileName}`);

    const metadataUri = urlData.publicUrl;

    // Generate asset signer
    const assetSigner = generateSigner(umi);

    console.log("keypair", keypair.publicKey.toBase58());

    // Create the NFT
    console.log("Creating NFT with metadata:", {
      name: metadata.name,
      uri: metadataUri,
      owner: body.recipientWallet || keypair.publicKey.toBase58(),
    });

    const result = await create(umi, {
      asset: assetSigner,
      name: metadata.name,
      uri: metadataUri,
      // If recipientWallet is provided, mint to that wallet, otherwise mint to creator
      ...(body.recipientWallet && { owner: publicKey(body.recipientWallet) }),
    }).sendAndConfirm(umi);

    console.log("NFT created successfully:", {
      assetId: assetSigner.publicKey.toString(),
      signature: result.signature.toString(),
    });

    const response: MintCertificateResponse = {
      assetId: assetSigner.publicKey.toString(),
      signature: result.signature.toString(),
      metadataUri: metadataUri,
    };

    return NextResponse.json<ApiResponse<MintCertificateResponse>>({
      code: 200,
      message: "Certificate NFT minted successfully",
      result: response,
    });
  } catch (error) {
    console.error("Error minting certificate NFT:", error);

    return NextResponse.json<ApiResponse<null>>(
      {
        code: 500,
        message: "Failed to mint certificate NFT",
        result: null,
      },
      { status: 500 }
    );
  }
}
