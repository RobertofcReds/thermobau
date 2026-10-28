"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type HeaderBehavior = "show-on-scroll-down" | "show-on-scroll-up";

const HeaderMenuContext = createContext<((open: boolean) => void) | null>(null);

export function useHeaderMenu() {
  return useContext(HeaderMenuContext);
}

export function SmartHeader({
  children,
  headerBehavior = "show-on-scroll-down",
}: {
  children: ReactNode;
  headerBehavior?: HeaderBehavior;
}) {
  const [scrollVisible, setScrollVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let movement = 0;

    function update() {
      frame.current = null;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;

      if (y <= 120) {
        movement = 0;
        setScrollVisible(true);
        return;
      }
      if (delta === 0) return;
      // Accumulate movement in one direction; tiny scroll reversals do not
      // repeatedly hide and reveal the navigation.
      movement =
        Math.sign(movement) === Math.sign(delta) ? movement + delta : delta;
      if (Math.abs(movement) < 12) return;
      const down = movement > 0;
      setScrollVisible(headerBehavior === "show-on-scroll-down" ? down : !down);
      movement = 0;
    }

    function onScroll() {
      if (frame.current === null)
        frame.current = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [headerBehavior]);

  const hidden = !scrollVisible && !menuOpen && !focusWithin;
  return (
    <HeaderMenuContext.Provider value={setMenuOpen}>
      <header
        className="site-header smart-header"
        data-header-behavior={headerBehavior}
        data-hidden={hidden}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocusWithin(false);
        }}
      >
        {children}
      </header>
    </HeaderMenuContext.Provider>
  );
}
