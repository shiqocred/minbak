"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TypingAnimationProps extends MotionProps {
  words: string[]; // List kata yang akan di-typing
  className?: string;
  typingSpeed?: number; // Kecepatan mengetik (ms per huruf)
  deleteSpeed?: number; // Kecepatan menghapus (ms per huruf)
  delayBetweenWords?: number; // Jeda antar kata setelah selesai diketik
  as?: React.ElementType;
}

export function TypingAnimation({
  words,
  className,
  typingSpeed = 100,
  deleteSpeed = 100,
  delayBetweenWords = 1000,
  as: Component = "span",
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentWord = words[wordIndex];
    if (!isDeleting) {
      // Mengetik kata
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Tunggu sebelum mulai menghapus
        timeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    } else {
      // Menghapus kata
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        // Pindah ke kata berikutnya
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deleteSpeed,
    delayBetweenWords,
  ]);

  return (
    <MotionComponent
      className={cn(
        "inline-block h-[3rem] md:h-[4rem] lg:h-[7rem] tracking-[-0.02em]",
        className
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}
