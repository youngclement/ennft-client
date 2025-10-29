import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  signerIdentity,
  createSignerFromKeypair,
  generateSigner,
} from "@metaplex-foundation/umi";
import bs58 from "bs58";

let umiSingleton: ReturnType<typeof createUmi> | null = null;

export function getUmi() {
  if (umiSingleton) return umiSingleton;

  const endpoint =
    process.env.SOLANA_RPC_ENDPOINT || "https://api.devnet.solana.com";
  const umi = createUmi(endpoint);

  const secret = process.env.SOLANA_PRIVATE_KEY;
  let identitySet = false;
  if (secret) {
    try {
      let secretBytes: Uint8Array;
      if (secret.trim().startsWith("[")) {
        // JSON array format
        const arr = JSON.parse(secret.trim());
        secretBytes = new Uint8Array(arr);
      } else {
        // Base58 format
        secretBytes = bs58.decode(secret.trim());
      }
      // Create keypair from secret using Umi's eddsa helper
      const keypair = umi.eddsa.createKeypairFromSecretKey(secretBytes);
      const signer = createSignerFromKeypair(umi, keypair);
      umi.use(signerIdentity(signer));
      identitySet = true;
    } catch (e) {
      console.warn(
        "Failed to parse SOLANA_PRIVATE_KEY. Using default identity. Error:",
        e
      );
    }
  }
  if (!identitySet) {
    umi.use(signerIdentity(generateSigner(umi)));
  }

  umiSingleton = umi;
  return umiSingleton;
}
