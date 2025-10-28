import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Shortens an Ethereum address to a more readable format
 * @param address The full Ethereum address
 * @returns A shortened version of the address
 */
export function shortenEthAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
