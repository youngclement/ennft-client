import { NextResponse } from 'next/server'
import { getUmi } from '@/lib/solana/umi'
import { publicKey } from '@metaplex-foundation/umi'
import {
  burn,
  fetchAsset,
  collectionAddress,
  fetchCollection,
} from '@metaplex-foundation/mpl-core'

export async function POST(req: Request) {
  try {
    const { assetAddress } = await req.json()
    if (!assetAddress || typeof assetAddress !== 'string') {
      return NextResponse.json(
        { error: 'assetAddress is required' },
        { status: 400 }
      )
    }

    const umi = getUmi()
    const assetId = publicKey(assetAddress)
    const asset = await fetchAsset(umi, assetId)

    // If part of a collection, fetch it to provide context to burn.
    let collection: any | undefined = undefined
    try {
      const colAddr = collectionAddress(asset)
      if (colAddr) {
        collection = await fetchCollection(umi, colAddr)
      }
    } catch (_) {
      // Collection fetch optional; proceed without it if fails.
    }

    const tx = await burn(umi, { asset, collection }).sendAndConfirm(umi)

    return NextResponse.json({
      ok: true,
      assetAddress,
      signature: tx.signature?.toString?.() ?? tx?.signature ?? null,
    })
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? 'Failed to burn asset' },
      { status: 500 }
    )
  }
}