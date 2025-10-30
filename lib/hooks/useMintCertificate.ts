import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mintCertificate } from "@/service/certificate.service";
import {
  MintCertificateData,
  MintCertificateResponse,
} from "@/service/dto/certificate/certificate.mint";
import { ApiResponse } from "@/service/dto/apiReponse";
import { toast } from "sonner";

export const useMintCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<MintCertificateResponse>,
    Error,
    MintCertificateData
  >({
    mutationFn: async (data: MintCertificateData) => {
      const response = await mintCertificate(data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Certificate NFT minted successfully!");
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
    onError: (error) => {
      console.error("Error minting certificate:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to mint certificate NFT";
      toast.error(errorMessage);
    },
  });
};
