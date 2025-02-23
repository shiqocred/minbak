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
  current?: {
    message: string;
    data: string | null;
    isPaid: "SUCCESS" | "FALSE" | "WAIT" | null;
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
              viewBox="0 0 49 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.3947 40C43.8275 39.8689 49 34.6073 49 28.1389C49 24.9931 47.7512 21.9762 45.5282 19.7518L25.7895 0V12.2771C25.7895 14.3303 26.6046 16.2995 28.0556 17.7514L32.6795 22.3784L32.6921 22.3907L40.4452 30.149C40.697 30.4009 40.697 30.8094 40.4452 31.0613C40.1935 31.3133 39.7852 31.3133 39.5335 31.0613L36.861 28.3871H12.139L9.46655 31.0613C9.21476 31.3133 8.80654 31.3133 8.55476 31.0613C8.30297 30.8094 8.30297 30.4009 8.55475 30.149L16.3079 22.3907L16.3205 22.3784L20.9444 17.7514C22.3954 16.2995 23.2105 14.3303 23.2105 12.2771V0L3.47175 19.7518C1.24882 21.9762 0 24.9931 0 28.1389C0 34.6073 5.17252 39.8689 11.6053 40H37.3947Z"
                fill="#FF0A0A"
              ></path>
            </svg>
            MINBAK
          </Link>
        </Button>
        <div className="items-center justify-center gap-2 hidden lg:flex">
          {current?.source && (
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
            {current?.source && (
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
