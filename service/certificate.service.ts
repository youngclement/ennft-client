import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "./dto/apiReponse";
import { MintCertificateData, MintCertificateResponse } from "./dto/certificate/certificate.mint";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function mintCertificate(
  data: MintCertificateData
): Promise<AxiosResponse<ApiResponse<MintCertificateResponse>>> {
  try {
    const response = await axios.post<ApiResponse<MintCertificateResponse>>(
      `${BASE_URL}/api/certificates/mint`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error minting certificate:", error);
    throw error;
  }
}

export async function getCertificateByAssetId(
  assetId: string
): Promise<AxiosResponse<ApiResponse<any>>> {
  try {
    const response = await axios.get<ApiResponse<any>>(
      `${BASE_URL}/api/certificates/${assetId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    throw error;
  }
}