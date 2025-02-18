"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MenuIcon, MoonStarIcon, SunDimIcon } from "lucide-react";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export const Navbar = ({
  current,
}: {
  current: {
    message: string;
    data: string | null;
    isPaid: boolean;
    source: boolean;
  };
}) => {
  const [isMount, setIsMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow border-b fixed top-0 left-0 z-20">
      <div className="w-full max-w-7xl mx-auto h-16 px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <Button
          className="flex-none cursor-pointer flex lg:hidden dark:bg-gray-900"
          size={"icon"}
          variant={"outline"}
          onClick={() => setIsOpen(true)}
        >
          <MenuIcon />
        </Button>
        <Button
          className="flex-none text-xl font-bold [&_svg]:size-6"
          variant={"link"}
          asChild
        >
          <Link href="/">
            <svg
              viewBox="0 0 40 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 30C26.3132 30 27.6136 29.7413 28.8268 29.2388C30.0401 28.7362 31.1425 27.9997 32.0711 27.0711C32.9997 26.1425 33.7362 25.0401 34.2388 23.8268C34.7413 22.6136 35 21.3132 35 20C35 16.0218 33.4196 12.2064 30.6066 9.3934C27.7936 6.58035 23.9782 5 20 5C16.0218 5 12.2064 6.58035 9.3934 9.3934C6.58035 12.2064 5 16.0218 5 20C5 21.3132 5.25866 22.6136 5.7612 23.8268C6.26375 25.0401 7.00035 26.1425 7.92893 27.0711C8.85752 27.9997 9.95991 28.7362 11.1732 29.2388C12.3864 29.7413 13.6868 30 15 30H25ZM20 9C17.0826 9 14.2847 10.1589 12.2218 12.2218C10.1589 14.2847 9 17.0826 9 20C9 20.7879 9.15519 21.5681 9.45672 22.2961C9.75825 23.0241 10.2002 23.6855 10.7574 24.2426C11.3145 24.7998 11.9759 25.2417 12.7039 25.5433C13.4319 25.8448 14.2121 26 15 26H25C25.7879 26 26.5681 25.8448 27.2961 25.5433C28.0241 25.2417 28.6855 24.7998 29.2426 24.2426C29.7998 23.6855 30.2417 23.0241 30.5433 22.2961C30.8448 21.5681 31 20.7879 31 20C31 17.0826 29.8411 14.2847 27.7782 12.2218C25.7153 10.1589 22.9174 9 20 9Z"
                fill="#3064E8"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 35C11.2928 35 9.60238 34.612 8.02512 33.8582C6.44792 33.1044 5.0148 31.9995 3.80761 30.6066C2.60047 29.2137 1.64289 27.5602 0.989566 25.7403C0.336257 23.9204 0 21.9698 0 20C0 14.6957 2.10714 9.60859 5.85787 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 21.9698 39.6637 23.9204 39.0104 25.7403C38.3571 27.5602 37.3995 29.2137 36.1924 30.6066C34.9852 31.9995 33.5521 33.1044 31.9749 33.8582C30.3976 34.612 28.7072 35 27 35H13ZM8.68629 8.68629C11.6869 5.68571 15.7565 4 20 4C24.2435 4 28.3131 5.68571 31.3137 8.68629C34.3143 11.6869 36 15.7565 36 20C36 21.5179 35.7404 23.0107 35.2457 24.3888C34.751 25.7668 34.0376 26.9854 33.1696 27.9869C32.3026 28.9873 31.3045 29.7452 30.25 30.2492C29.1981 30.752 28.0957 31 27 31H13C11.9043 31 10.8019 30.752 9.74999 30.2492C8.69549 29.7452 7.6974 28.9873 6.83037 27.9869C5.96242 26.9854 5.24903 25.7668 4.75433 24.3888C4.25961 23.0107 4 21.5179 4 20C4 15.7565 5.68571 11.6869 8.68629 8.68629Z"
                fill="#3064E8"
              ></path>
              <path
                d="M25 25H19.9956C19.6596 24.9997 19.3261 24.9655 19 24.899C18.368 24.77 17.7637 24.5192 17.2222 24.1573C16.3999 23.6079 15.759 22.8271 15.3806 21.9134C15.2579 21.6171 15.1645 21.3112 15.101 21C14.9686 20.3515 14.9657 19.6799 15.0961 19.0245C15.289 18.0546 15.7652 17.1637 16.4645 16.4645C17.1637 15.7652 18.0546 15.289 19.0245 15.0961C19.0549 15.09 19.0852 15.0843 19.1156 15.0788C19.4087 15.0262 19.7047 15 20 15C20.6535 15 21.3038 15.1281 21.9134 15.3806C22.827 15.759 23.6079 16.3999 24.1573 17.2221C24.7068 18.0444 25 19.0111 25 20H21C21 19.8022 20.9414 19.6089 20.8315 19.4444C20.7216 19.28 20.5654 19.1518 20.3827 19.0761C20.2 19.0004 19.9989 18.9806 19.8049 19.0192C19.6109 19.0578 19.4327 19.153 19.2929 19.2929C19.153 19.4327 19.0578 19.6109 19.0192 19.8049C18.9806 19.9989 19.0004 20.2 19.0761 20.3827C19.1518 20.5654 19.28 20.7216 19.4444 20.8315C19.6089 20.9414 19.8022 21 20 21H25C25.1313 21 25.2614 20.9741 25.3827 20.9239C25.504 20.8736 25.6142 20.8 25.7071 20.7071C25.8 20.6142 25.8736 20.504 25.9239 20.3827C25.9741 20.2614 26 20.1313 26 20C26 18.4087 25.3679 16.8826 24.2426 15.7574C23.1174 14.6321 21.5913 14 20 14C19.8274 14 19.6556 14.0074 19.485 14.0221C19.0657 14.0582 18.6535 14.1382 18.255 14.2594C17.8629 14.3785 17.484 14.5376 17.1243 14.734C16.7123 14.959 16.3255 15.233 15.973 15.5522C15.8996 15.6186 15.8277 15.687 15.7574 15.7574C15.2651 16.2496 14.8672 16.8187 14.5753 17.4363C14.4294 17.7451 14.3099 18.066 14.2185 18.3956C14.1139 18.7724 14.0459 19.1604 14.0166 19.5544C14.0056 19.7022 14 19.8508 14 20C14 20.7841 14.1537 21.5646 14.4567 22.2961C14.9109 23.3925 15.6799 24.3295 16.6666 24.9888C16.6722 24.9926 16.6778 24.9963 16.6834 25H15C14.3434 25 13.6932 24.8707 13.0866 24.6194C12.48 24.3681 11.9288 23.9998 11.4645 23.5355C11.0002 23.0712 10.6319 22.52 10.3806 21.9134C10.1293 21.3068 10 20.6566 10 20C10 17.3478 11.0536 14.8043 12.9289 12.9289C14.8043 11.0536 17.3478 10 20 10C22.6522 10 25.1957 11.0536 27.0711 12.9289C28.9464 14.8043 30 17.3478 30 20C30 20.6566 29.8707 21.3068 29.6194 21.9134C29.3681 22.52 28.9998 23.0712 28.5355 23.5355C28.0712 23.9998 27.52 24.3681 26.9134 24.6194C26.3068 24.8707 25.6566 25 25 25Z"
                fill="#3064E8"
              ></path>
            </svg>
            MBTI
          </Link>
        </Button>
        <div className="items-center justify-center gap-2 hidden lg:flex">
          {current.source && (
            <Button asChild variant={"link"}>
              <Link href={"/?page=result"}>Hasil Anda</Link>
            </Button>
          )}
          <Button asChild variant={"link"}>
            <Link href={"/"}>Test Kepribadian</Link>
          </Button>
          <Button asChild variant={"link"}>
            <Link href={"#"}>Hubungi Kami</Link>
          </Button>
          <Button asChild variant={"link"}>
            <Link href={"#"}>Syarat & Ketentuan</Link>
          </Button>
        </div>
        <Button
          className="flex-none cursor-pointer"
          size={"icon"}
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
        >
          {theme === "light" && <MoonStarIcon />}
          {theme === "dark" && <SunDimIcon />}
        </Button>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center underline underline-offset-2">
              Navigation
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="items-center justify-center gap-2 flex flex-col">
            {current.source && (
              <Button
                className="h-10"
                asChild
                variant={"link"}
                onClick={() => setIsOpen(false)}
              >
                <Link href={"/?page=result"}>Hasil Anda</Link>
              </Button>
            )}
            <Button
              className="h-10"
              asChild
              variant={"link"}
              onClick={() => setIsOpen(false)}
            >
              <Link href={"/"}>Test Kepribadian</Link>
            </Button>
            <Button
              className="h-10"
              asChild
              variant={"link"}
              onClick={() => setIsOpen(false)}
            >
              <Link href={"#"}>Hubungi Kami</Link>
            </Button>
            <Button
              className="h-10"
              asChild
              variant={"link"}
              onClick={() => setIsOpen(false)}
            >
              <Link href={"#"}>Syarat & Ketentuan</Link>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
