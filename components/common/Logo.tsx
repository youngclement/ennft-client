'use client';
import { useTheme } from 'next-themes';
import React from 'react';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  const { theme } = useTheme();
  return (
    <div className={`${className}`}>
      <svg
        version="1.1"
        id="Calque_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 360 360"
        enable-background="new 0 0 360 360"
        width="48"
        height="48"
        data-uid="o-b6402f89ff7e46baafaded683aaedb22"
      >
        <g data-uid="o-0cf95da753b844b797570d4fbd4e28fe">
          <path
            className="st0"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
            data-type="polygon"
            d="M107.05 214.51L107.05 136.11L160.94 136.11L160.94 108.37L79.3 108.37L79.3 242.25L160.94 242.25L160.94 214.51Z"
            data-uid="o-f1d953b0e8bc4d259ffd640149b886d4"
          ></path>
          <path
            className="st0"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
            data-type="polygon"
            d="M282.33 80.62L160.94 80.63L160.94 108.37L254.59 108.37L254.59 214.51L192.15 214.51L160.94 242.25L160.94 279.38L202.7 242.25L282.33 242.25Z"
            data-uid="o-ba5e0c46d588479d810156a0e91d2c1c"
          ></path>
          <path
            className="st0"
            d="M138.4 160.83c-7.66 0-13.87 6.21-13.87 13.87s6.21 13.87 13.87 13.87c7.66 0 13.87-6.21 13.87-13.87
      S146.06 160.83 138.4 160.83z"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
            data-uid="o-efa6826bc6664c28b77ed4235232d2f6"
          ></path>
          <path
            className="st0"
            d="M180.82 160.83c-7.66 0-13.87 6.21-13.87 13.87s6.21 13.87 13.87 13.87c7.66 0 13.87-6.21 13.87-13.87
      S188.48 160.83 180.82 160.83z"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
            data-uid="o-d4d5a17884574a83886ff630205d099a"
          ></path>
          <path
            className="st0"
            d="M223.24 188.57c7.66 0 13.87-6.21 13.87-13.87s-6.21-13.87-13.87-13.87c-7.66 0-13.87 6.21-13.87 13.87
      S215.58 188.57 223.24 188.57z"
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill={theme === 'dark' ? '#FFFFFF' : '#121212'}
            data-uid="o-b931500078cc4f1596193a224765a123"
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
