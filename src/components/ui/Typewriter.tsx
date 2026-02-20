"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypewriterProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  className?: string;
}

export function Typewriter({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true,
  className = "",
}: TypewriterProps) {
  const el = useRef(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      showCursor: true,
      cursorChar: "|",
    };

    if (el.current) {
      typed.current = new Typed(el.current, options);
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={el} className={className} />;
}
