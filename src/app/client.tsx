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
  Briefcase,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Loader,
  Loader2,
  LockOpenIcon,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { MouseEvent, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import confetti from "canvas-confetti";
import { deleteCookie, getCookie } from "cookies-next/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Ripple } from "@/components/magicui/ripple";
import { useIsMobile } from "@/hooks/use-mobile";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().trim().min(3, {
    message: "Minimal 3 karakter",
  }),
  number: z.string().trim().min(10, {
    message: "Minimal 10 angka",
  }),
});

export const HomeClient = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const notif = getCookie("notif");
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  const [confirm, setConfirm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isPaymentProcess, setIsPaymentProcess] = useState(false);

  const [current, setCurrent] = useState<{
    message: string;
    data: string | null;
    isPaid: "SUCCESS" | "FALSE" | "WAIT" | null;
    source: boolean;
  } | null>(null);
  const [posSoal, setPosSoal] = useState(0);
  const [directSoal, setDirectSoal] = useState(0);
  const [page, setPage] = useQueryState("page", { defaultValue: "" });

  const [soalAcak, setSoalAcak] = useState<ConvertedData[]>(getSoalAcak());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
    },
  });

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
      setCurrent(data);
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

      getCurrent();
      setIsSend(true);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  };

  const mutatePay = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPaymentProcess(true);
    try {
      const msg = await fetch("/api/pay", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!msg.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await msg.json();

      form.reset();
      router.push(data);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to fetch");
    } finally {
      setIsPaymentProcess(false);
    }
  };

  const handleChangeJawaban = (index: number, jawabanBaru: number) => {
    setSoalAcak((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, score: jawabanBaru } : item
      )
    );
  };

  useEffect(() => {
    if (notif === "00") {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      toast.success("Pembayaran Berhasil");

      return deleteCookie("notif");
    }

    if (notif === "01") {
      toast.error("Pembayaran Gagal");

      return deleteCookie("notif");
    }
  }, [notif]);

  useEffect(() => {
    if (current && !current.source && page === "result") {
      setPage("");
    }
    if (current && current.source && isSend) {
      setIsSend(false);
      setPage("result");
    }
  }, [current, page, isSend]);

  useEffect(() => {
    setIsMounted(true);
    getCurrent();

    const params = new URLSearchParams(searchParams);

    // Hapus parameter yang tidak diperlukan
    params.delete("order_id");
    params.delete("status_code");
    params.delete("transaction_status");
    params.delete("action");

    // Periksa apakah URL perlu diperbarui
    const newUrl = `?${params.toString()}`;
    if (window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!current) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-3 pt-8">
        <Navbar />
        <Loader className="size-7 animate-spin" />
        <p className="animate-pulse">Memuat content</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full pt-8">
      <Navbar current={current} />
      <AnimatePresence mode="wait" custom={page}>
        {page === "" && (
          <motion.div
            key={page}
            initial={{ y: `100vh`, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 flex items-center justify-center flex-col gap-8 relative overflow-hidden"
          >
            <Ripple
              mainCircleSize={isMobile ? 200 : 300}
              numCircles={isMobile ? 8 : 10}
              mainCircleOpacity={isMobile ? 0.17 : 0.25}
            />
            <Button
              className="flex items-center gap-1 rounded-full h-auto py-1.5 bg-gray-50 dark:bg-gray-900 cursor-pointer disabled:opacity-100 disabled:cursor-default "
              variant={"outline"}
              disabled={!current.source}
              onClick={() => router.push("/?page=result")}
            >
              {current.source && current.isPaid !== "SUCCESS" && "🌱"}
              {current.data && "🎉"}
              {!current.source && "🐣"}
              <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
              <span className={cn(`inline animate-gradient dark:text-white`)}>
                {current.source && current.isPaid !== "SUCCESS"
                  ? "Cukup Rp. 9000 untuk mengenali dirimu"
                  : !current.source
                  ? "Who are you guys?"
                  : "Lihat Jawaban Anda"}
              </span>
              {!!current.source && (
                <ChevronRight className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              )}
            </Button>
            <div className="flex items-center justify-center gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-7xl bg-gradient-to-br from-gray-500 to-gray-900 dark:from-white dark:to-gray-500 bg-clip-text text-transparent text-center flex-col flex items-center justify-center md:flex-row md:gap-4">
                <span className="h-[3rem] md:h-[4rem] lg:h-[7rem]">
                  Temukan
                </span>{" "}
                <TypingAnimation
                  words={["Minat Sejati", "Bakat Alami"]}
                  typingSpeed={200}
                  deleteSpeed={200}
                  delayBetweenWords={2000}
                />
              </h1>
              <p className="md:text-lg lg:text-xl text-center dark:text-gray-300">
                Jawab pertanyaan sederhana & ketahui jalur karier yang paling
                cocok untukmu!
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 w-full flex-col md:flex-row">
              <MagicCard
                className="flex items-center justify-center gap-4 px-3 h-10 lg:h-12 rounded col-span-1 w-full max-w-sm"
                gradientColor={theme === "dark" ? "#1f2937" : "#e5e7eb"}
              >
                <WordRotate
                  className="flex items-center justify-start gap-4 w-full"
                  duration={5000}
                  words={[
                    <>
                      <Search className="size-5 flex-none" />
                      <p className="font-medium text-sm lg:text-base">
                        Kenali bakat terpendammu
                      </p>
                    </>,
                    <>
                      <Briefcase className="size-5 flex-none" />
                      <p className="font-medium text-sm lg:text-base">
                        Pahami pilihan karier yang sesuai
                      </p>
                    </>,
                    <>
                      <GraduationCap className="size-5 flex-none" />
                      <p className="font-medium text-sm lg:text-base">
                        Asah potensimu dengan wawasan baru
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
                      {Array.from({ length: 4 }, (_, i) => (
                        <Button
                          key={i}
                          className={cn(
                            "rounded-full bg-transparent text-gray-900 dark:text-gray-50 border-[1.5px] transition-all hover:text-white cursor-pointer dark:bg-gray-950",
                            (i === 1 || i === 2) &&
                              "w-14 aspect-square h-auto ",
                            (i === 0 || i === 3) &&
                              "w-16 aspect-square h-auto text-lg",
                            soalAcak[posSoal].score === 1 &&
                              i === 0 &&
                              " bg-red-500 dark:bg-red-500 text-white",
                            soalAcak[posSoal].score === 2 &&
                              i === 1 &&
                              " bg-amber-500 dark:bg-amber-500 text-white",
                            soalAcak[posSoal].score === 4 &&
                              i === 2 &&
                              "bg-lime-500 dark:bg-lime-500 text-white",
                            soalAcak[posSoal].score === 5 &&
                              i === 3 &&
                              "bg-green-500 dark:bg-green-500 text-white",
                            i === 0 &&
                              "border-red-500 hover:bg-red-500 dark:hover:text-gray-950 dark:hover:bg-red-500",
                            i === 1 &&
                              "border-amber-500 hover:bg-amber-500 dark:hover:text-gray-950 dark:hover:bg-amber-500",
                            i === 2 &&
                              "border-lime-500 hover:bg-lime-500 dark:hover:text-gray-950 dark:hover:bg-lime-500",
                            i === 3 &&
                              "border-green-500 hover:bg-green-500 dark:hover:text-gray-950 dark:hover:bg-green-500"
                          )}
                          onClick={() => {
                            if (posSoal === directSoal) {
                              handleChangeJawaban(
                                directSoal,
                                i >= 2 ? i + 2 : i + 1
                              );
                            } else {
                              handleChangeJawaban(
                                posSoal,
                                i >= 2 ? i + 2 : i + 1
                              );
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
                <div className="w-full h-full absolute top-0 left-0 z-10 flex items-center justify-center flex-col gap-4 backdrop-blur-sm bg-white/15 dark:bg-black/15">
                  {current.data && (
                    <p className="w-full max-w-md text-center dark:bg-black/15 bg-white/15 backdrop-blur-sm px-5">
                      Jika ingin melanjutkan, anda akan kehilangan jawaban saat
                      ini dan melakukan pembayaran ulang
                    </p>
                  )}
                  <div className="flex gap-2">
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
                      className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-400 hover:dark:bg-yellow-500 cursor-pointer text-black"
                    >
                      Lihat Jawaban
                      <ArrowRight />
                    </Button>
                  </div>
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
            className="w-full h-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-center flex-col pt-8"
          >
            <div className="py-2 md:py-5 lg:py-0 h-full w-full relative">
              <ScrollArea className="h-full w-full max-w-7xl p-4 md:p-6 lg:p-8 rounded-md overflow-hidden prose prose-sm lg:prose-base prose-p:my-3 prose-ul:my-3 prose-h2:mt-10 prose-h2:mb-2 leading-relaxed prose-p:text-justify prose-li:text-justify prose-hr:border-gray-300 dark:prose-hr:border-gray-700 dark:text-gray-200 prose-strong:dark:text-white prose-headings:dark:text-white">
                <ReactMarkdown className={"w-full max-w-3xl mx-auto"}>
                  {current.isPaid !== "SUCCESS" || !current.data
                    ? responseExample
                    : current.data}
                </ReactMarkdown>
              </ScrollArea>
              {!current.data && current.isPaid === "SUCCESS" && (
                <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-gray-50/15 dark:bg-gray-900/15 flex items-center justify-center flex-col gap-4">
                  <div className="flex items-center justify-center w-full h-full gap-2">
                    <Sparkles className="size-5 animate-pulse" />
                    <p className="animate-pulse">Sedang Memuat Analisa...</p>
                  </div>
                </div>
              )}
              {current &&
                current.isPaid !== "SUCCESS" &&
                current.isPaid !== "WAIT" && (
                  <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-gray-50/15 dark:bg-gray-900/15 flex items-center justify-center flex-col gap-4">
                    <div className="w-full max-w-sm p-5 bg-yellow-400 rounded-lg shadow text-black dark:text-black flex items-center justify-center flex-col gap-4 relative overflow-hidden">
                      <p className="font-semibold text-center">
                        Dapatkan hasilnya dengan membayar <br />
                        Rp. 9.000
                      </p>
                      <Button
                        className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-50 hover:dark:bg-gray-50 w-full cursor-pointer"
                        onClick={mutatePay}
                      >
                        <LockOpenIcon />
                        Dapatkan Akses
                      </Button>
                      {isPaymentProcess && (
                        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center gap-2 bg-black/5 backdrop-blur-sm text-black">
                          <Loader className="size-4 animate-spin" />
                          Sedang di proses
                        </div>
                      )}
                    </div>
                  </div>
                )}
              {current && current.isPaid === "WAIT" && (
                <div className="absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-gray-50/15 dark:bg-gray-900/15 flex items-center justify-center flex-col gap-4">
                  <div className="w-full max-w-sm p-5 bg-yellow-400 rounded-lg shadow text-black dark:text-black flex items-center justify-center flex-col gap-4 relative overflow-hidden">
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <p className="font-semibold text-center">
                        Menunggu pembayaran
                      </p>
                    </div>
                    <div className="bg-gray-800 w-full h-px" />
                    <p className="font-semibold text-center">
                      Sudah bayar? Refresh halaman untuk memperbarui status
                      pembayaran
                    </p>
                    <p>atau</p>
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-50 hover:dark:bg-gray-50 w-full cursor-pointer"
                      onClick={mutatePay}
                    >
                      <LockOpenIcon />
                      Dapatkan Akses Ulang
                    </Button>
                    {isPaymentProcess && (
                      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center gap-2 bg-black/5 backdrop-blur-sm text-black">
                        <Loader className="size-4 animate-spin" />
                        Sedang di proses
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
