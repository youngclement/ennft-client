import { getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { ledgerWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { ancient8Sepolia as network } from "wagmi/chains";
import { http } from "wagmi";

const { wallets } = getDefaultWallets();

const walletConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [network],
  transports: {
    [network.id]: http(),
  },
  ssr: true,
});

export default walletConfig;
export { network };
