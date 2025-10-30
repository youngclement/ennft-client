export interface MintCertificateData {
  name: string;
  email?: string;
  courseName: string;
  completionDate: string;
  recipientWallet?: string;
  certificateType?: string;
}

export interface MintCertificateResponse {
  assetId: string;
  signature: string;
  metadataUri: string;
}

export interface CertificateMetadata {
  name: string;
  description: string;
  image: string;
  attributes: CertificateAttribute[];
  properties: {
    category: string;
    creators: Creator[];
  };
}

export interface CertificateAttribute {
  trait_type: string;
  value: string;
}

export interface Creator {
  address: string;
  share: number;
}