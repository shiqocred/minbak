"use client";

import { InteractiveHoverButton } from "@/components/interactive-button";
import { MagicCard } from "@/components/magicui/magic-card";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, getSoalAcak, responseExample } from "@/lib/utils";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  LockOpenIcon,
  Rocket,
  Sparkles,
  UserCheck2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQueryState } from "nuqs";
import { toast } from "sonner";

export const HomeClient = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [directSoal, setDirectSoal] = useState(0);
  const [posSoal, setPosSoal] = useState(0);
  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [responseAi, setResponseAi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [soalAcak, setSoalAcak] = useState<{ soal: string; jawaban: number }[]>(
    getSoalAcak()
  );

  const getResponse = async () => {
    setIsLoading(true);
    try {
      const msg = await fetch("/api/output", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ soal: soalAcak }),
      });

      if (!msg.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await msg.json();
      setResponseAi(data);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch");
    } finally {
      setPage("result");
      setIsLoading(false);
    }
  };

  const handleChangeJawaban = (index: number, jawabanBaru: number) => {
    setSoalAcak((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, jawaban: jawabanBaru } : item
      )
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait" custom={page}>
        {page === "" && (
          <motion.div
            key={page}
            initial={{ y: `100vh`, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 flex items-center justify-center flex-col gap-8"
          >
            <div className="flex items-center justify-center gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-gray-500 to-gray-900 dark:from-white dark:to-gray-500 bg-clip-text text-transparent text-balance max-w-5xl text-center">
                Kenali Dirimu, Pahami Potensimu
              </h1>
              <p className="md:text-lg lg:text-xl text-center dark:text-gray-300">
                Jawab pertanyaan sederhana & dapatkan insight mendalam tentang
                dirimu!
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 w-full flex-col md:flex-row">
              <MagicCard
                className="dark:bg-gray-900 bg-gray-50 flex items-center justify-center gap-4 px-3 h-10 lg:h-12 rounded col-span-1 w-[323px] lg:w-full max-w-sm"
                gradientColor={theme === "dark" ? "#1f2937" : "#e5e7eb"}
              >
                <WordRotate
                  className="flex items-center justify-start gap-4  w-full"
                  duration={3000}
                  words={[
                    <>
                      <UserCheck2 className="size-5 flex-none" />
                      <p className="font-medium text-sm lg:text-base">
                        Jujur dan temukan kepribadian Anda
                      </p>
                    </>,
                    <>
                      <Brain className="size-5 flex-none" />
                      <p className="font-medium text-sm lg:text-base">
                        Pahami dampak kepribadian Anda
                      </p>
                    </>,
                    <>
                      <Rocket className="size-5 flex-none" />
                      <p className="font-medium text-sm lg:text-base">
                        Tumbuh dengan materi premium
                      </p>
                    </>,
                  ]}
                />
              </MagicCard>
              <InteractiveHoverButton
                onClick={() => {
                  setPage("test");
                }}
                className="lg:text-lg h-10 lg:h-12 flex-none flex items-center justify-center text-base"
              >
                Mulai Tes
              </InteractiveHoverButton>
            </div>
          </motion.div>
        )}
        {page === "test" && (
          <motion.div
            key={page}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-5 lg:py-10 flex items-center justify-center"
          >
            <div className="w-full h-[500px] flex flex-col justify-between items-center overflow-hidden bg-white dark:bg-gray-950 px-8 py-5 rounded-2xl shadow-md border relative">
              <div className="flex flex-col gap-4 w-full">
                <Progress value={(posSoal + 1) * (100 / soalAcak.length)} />
                <div className="w-full flex justify-between items-center">
                  <p>
                    {posSoal + 1}/{soalAcak.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      className="cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-900 transition-all"
                      variant={"outline"}
                      disabled={posSoal === 0}
                      size={"icon"}
                      onClick={() => {
                        setPosSoal((prev) => prev - 1);
                      }}
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      className="cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-500 hover:text-white dark:hover:text-gray-900 transition-all"
                      variant={"outline"}
                      disabled={posSoal === directSoal}
                      size={"icon"}
                      onClick={() => {
                        setPosSoal((prev) => prev + 1);
                      }}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  key={posSoal}
                  className="flex flex-col items-center justify-between h-[280px] w-full max-w-3xl"
                >
                  <p className="text-xl tracking-wide text-center leading-relaxed font-medium">
                    {soalAcak[posSoal].soal}
                  </p>
                  <div className="flex flex-col gap-2 items-center justify-center w-full">
                    <div className="flex gap-4 items-center justify-between w-full">
                      <p className="w-40 text-end hidden md:block">
                        Sangat Tidak Setuju
                      </p>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Button
                          key={i}
                          className={cn(
                            "rounded-full bg-transparent text-gray-900 dark:text-gray-50 border-[1.5px] transition-all hover:text-white cursor-pointer dark:bg-gray-950",
                            i === 2 &&
                              "w-12 aspect-square h-auto border-yellow-500 hover:bg-yellow-500 dark:hover:text-gray-950 dark:hover:bg-yellow-500",
                            soalAcak[posSoal].jawaban - 1 === i &&
                              i === 2 &&
                              "bg-yellow-500 dark:bg-yellow-500 text-white",
                            (i === 1 || i === 3) &&
                              "w-14 aspect-square h-auto ",
                            (i === 0 || i === 4) &&
                              "w-16 aspect-square h-auto text-lg",
                            soalAcak[posSoal].jawaban - 1 === i &&
                              i === 0 &&
                              " bg-red-500 dark:bg-red-500 text-white",
                            soalAcak[posSoal].jawaban - 1 === i &&
                              i === 1 &&
                              " bg-amber-500 dark:bg-amber-500 text-white",
                            soalAcak[posSoal].jawaban - 1 === i &&
                              i === 3 &&
                              "bg-lime-500 dark:bg-lime-500 text-white",
                            soalAcak[posSoal].jawaban - 1 === i &&
                              i === 4 &&
                              "bg-green-500 dark:border-green-500 text-white",
                            i === 0 &&
                              "border-red-500 hover:bg-red-500 dark:hover:text-gray-950 dark:hover:bg-red-500",
                            i === 1 &&
                              "border-amber-500 hover:bg-amber-500 dark:hover:text-gray-950 dark:hover:bg-amber-500",
                            i === 3 &&
                              "border-lime-500 hover:bg-lime-500 dark:hover:text-gray-950 dark:hover:bg-lime-500",
                            i === 4 &&
                              "border-green-500 hover:bg-green-500 dark:hover:text-gray-950 dark:hover:bg-green-500"
                          )}
                          onClick={() => {
                            if (posSoal === directSoal) {
                              handleChangeJawaban(directSoal, i + 1);
                            } else {
                              handleChangeJawaban(posSoal, i + 1);
                            }
                            if (
                              posSoal === directSoal &&
                              directSoal !== soalAcak.length - 1
                            ) {
                              setDirectSoal((prev) => prev + 1);
                              setPosSoal((prev) => prev + 1);
                            } else if (
                              posSoal !== directSoal &&
                              directSoal !== soalAcak.length - 1
                            ) {
                              setPosSoal((prev) => prev + 1);
                            } else if (directSoal === soalAcak.length - 1) {
                              getResponse();
                              setSoalAcak(getSoalAcak());
                              setDirectSoal(0);
                              setPosSoal(0);
                            }
                          }}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <p className="w-40 text-start hidden md:block">
                        Sangat Setuju
                      </p>
                    </div>
                    <div className="w-full flex justify-between text-xs dark:text-gray-300 md:hidden">
                      <p>Sangat Tidak Setuju</p>
                      <p>Sangat Setuju</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {isLoading && (
                <div className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center gap-2 backdrop-blur-sm bg-white/15 dark:bg-black/15">
                  <Sparkles className="size-5 animate-pulse" />
                  <p className="animate-pulse">Sedang Menganalisa...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
        {page === "result" && (
          <motion.div
            key={page}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-center flex-col pt-16"
          >
            <div className="py-10 md:py-12 lg:py-0 h-full w-full relative">
              <ScrollArea className="h-full w-full max-w-7xl p-4 md:p-6 lg:p-8 rounded-md overflow-hidden prose prose-sm lg:prose-base prose-p:my-3 prose-ul:my-3 prose-h2:mt-10 prose-h2:mb-2 leading-relaxed prose-p:text-justify prose-li:text-justify dark:text-gray-200 prose-strong:dark:text-white prose-headings:dark:text-white">
                <ReactMarkdown className={"w-full max-w-3xl mx-auto"}>
                  {isPaid ? responseAi : responseExample}
                </ReactMarkdown>
              </ScrollArea>
              {!isPaid && (
                <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-gray-50/15 dark:bg-gray-900/15 flex items-center justify-center flex-col gap-4">
                  <p className="font-semibold text-center">
                    Dapatkan hasilnya dengan membayar Rp. 10.000
                  </p>
                  <Button onClick={() => setIsPaid(true)}>
                    <LockOpenIcon />
                    Dapatkan Akses
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
