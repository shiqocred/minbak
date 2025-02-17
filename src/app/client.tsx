"use client";

import { InteractiveHoverButton } from "@/components/interactive-button";
import { MagicCard } from "@/components/magicui/magic-card";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  cn,
  getSoalAcak,
  responseExample,
  ConvertedData,
  transformData,
} from "@/lib/utils";
import {
  ArrowRight,
  Brain,
  ChevronLeft,
  ChevronRight,
  CreditCardIcon,
  Loader,
  LockOpenIcon,
  Rocket,
  Sparkles,
  UserCheck2,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { FormEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const HomeClient = () => {
  const { theme } = useTheme();
  const router = useRouter();

  const [confirm, setConfirm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isPaymentProcess, setIsPaymentProcess] = useState(false);

  const [posSoal, setPosSoal] = useState(0);
  const [directSoal, setDirectSoal] = useState(0);
  const [page, setPage] = useQueryState("page", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "" });

  const [emailCustomer, setEmailCustomer] = useState("");

  const [soalAcak, setSoalAcak] = useState<ConvertedData[]>(getSoalAcak());

  const getCurrent = async () => {
    setIsLoading(true);
    try {
      const msg = await fetch("/api/current", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!msg.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await msg.json();
      return data;
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const getResponse = async () => {
    setIsLoading(true);
    const body = transformData(soalAcak);
    try {
      const msg = await fetch("/api/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ soal: body }),
      });

      if (!msg.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await msg.json();

      return data;
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch");
    } finally {
      setIsLoading(false);
      setPage("result");
    }
  };

  const mutatePay = async (e: FormEvent) => {
    e.preventDefault();
    setIsPaymentProcess(true);
    try {
      const msg = await fetch("/api/pay", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailCustomer }),
      });

      if (!msg.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await msg.json();

      setEmailCustomer("");
      router.push(data);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch");
    } finally {
      setIsPaymentProcess(false);
      setIsPayment(false);
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
    setTimeout(() => {
      setStatus("");
    }, 10000);
    getCurrent();
  }, [status]);

  useEffect(() => {
    setIsMounted(true);
    getCurrent();
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
                    {soalAcak[posSoal].question}
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
                            soalAcak[posSoal].score - 1 === i &&
                              i === 2 &&
                              "bg-yellow-500 dark:bg-yellow-500 text-white",
                            (i === 1 || i === 3) &&
                              "w-14 aspect-square h-auto ",
                            (i === 0 || i === 4) &&
                              "w-16 aspect-square h-auto text-lg",
                            soalAcak[posSoal].score - 1 === i &&
                              i === 0 &&
                              " bg-red-500 dark:bg-red-500 text-white",
                            soalAcak[posSoal].score - 1 === i &&
                              i === 1 &&
                              " bg-amber-500 dark:bg-amber-500 text-white",
                            soalAcak[posSoal].score - 1 === i &&
                              i === 3 &&
                              "bg-lime-500 dark:bg-lime-500 text-white",
                            soalAcak[posSoal].score - 1 === i &&
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
                              setConfirm(true);
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
              {confirm && (
                <div className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center gap-2 backdrop-blur-sm bg-white/15 dark:bg-black/15">
                  <Button
                    onClick={() => setConfirm(false)}
                    className=" cursor-pointer"
                  >
                    <XCircle />
                    Kembali
                  </Button>
                  <Button
                    onClick={() => {
                      getResponse();
                      setSoalAcak(getSoalAcak());
                      setDirectSoal(0);
                      setPosSoal(0);
                      setConfirm(false);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-400 hover:dark:bg-yellow-500 cursor-pointer"
                  >
                    Lihat Jawaban
                    <ArrowRight />
                  </Button>
                </div>
              )}
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
                  {responseExample}
                </ReactMarkdown>
              </ScrollArea>
              <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-gray-50/15 dark:bg-gray-900/15 flex items-center justify-center flex-col gap-4">
                {!isPayment ? (
                  <div className="w-full max-w-sm h-[168px] p-5 bg-yellow-400 rounded-lg shadow text-black dark:text-black flex items-center justify-center flex-col gap-4">
                    <p className="font-semibold text-center">
                      Dapatkan hasilnya dengan membayar Rp. 10.000
                    </p>
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-50 hover:dark:bg-gray-50 w-full cursor-pointer"
                      onClick={() => setIsPayment(true)}
                    >
                      <LockOpenIcon />
                      Dapatkan Akses
                    </Button>
                  </div>
                ) : (
                  <div className="w-full max-w-sm overflow-hidden h-[168px] relative p-5 bg-yellow-400 rounded-lg shadow text-black dark:text-black flex items-center justify-center flex-col gap-4">
                    <form
                      onSubmit={mutatePay}
                      className="flex items-center justify-center flex-col gap-4 w-full"
                    >
                      <p className="font-semibold text-center">Masukan Email</p>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        className="text-center focus-visible:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-500 shadow-none border-gray-500 focus-visible:border-gray-900"
                        value={emailCustomer}
                        onChange={(e) => setEmailCustomer(e.target.value)}
                      />
                      <div className="flex w-full items-center gap-2">
                        <Button
                          className="border-gray-900 hover:border-gray-800 dark:border-gray-900 hover:dark:border-gray-800 w-1/4 cursor-pointer bg-transparent dark:bg-transparent hover:bg-yellow-500 hover:dark:bg-yellow-500 hover:dark:text-black"
                          type="button"
                          variant={"outline"}
                          onClick={() => setIsPayment(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-900 hover:dark:bg-gray-800 w-3/4 cursor-pointer dark:text-white"
                          type="submit"
                          disabled={!emailCustomer}
                        >
                          <CreditCardIcon />
                          Lanjutkan Pembayaran
                        </Button>
                      </div>
                    </form>
                    {isPaymentProcess && (
                      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center gap-2 bg-black/5 backdrop-blur-sm text-black">
                        <Loader className="size-4 animate-spin" />
                        Sedang di proses
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
