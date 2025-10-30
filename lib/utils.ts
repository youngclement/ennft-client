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
export function truncateAddress(
  address: string,
  opts?: { prefix?: number; suffix?: number; separator?: string }
): string {
  const { prefix = 4, suffix = 4, separator = '...' } = opts || {};
  if (!address) return '';
  if (address.length <= prefix + suffix) return address;
  return `${address.slice(0, prefix)}${separator}${address.slice(-suffix)}`;
}
