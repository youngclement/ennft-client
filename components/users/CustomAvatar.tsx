import { identicon } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { AvatarComponent } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const CustomAvatar: AvatarComponent = ({ address, ensImage, size = 40 }) => {
  if (!address) {
    return <span className="text-gray-500 text-sm font-semibold">N/A</span>;
  }

  const avatarSrc = ensImage
    ? ensImage
    : createAvatar(identicon, {
        seed: address,
        size: size,
        backgroundType: ['gradientLinear', 'solid'],
      }).toDataUri();

  return (
    <Image
      src={avatarSrc}
      alt="Avatar"
      width={size}
      height={size}
      className="rounded-full w-full h-full"
      unoptimized
    />
  );
};

export default CustomAvatar;
