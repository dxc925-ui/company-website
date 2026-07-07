import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (typeof window !== "undefined") {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return null;
  }

  return (
    <>
      <div
        className={`fixed pointer-events-none z-[9999] hidden md:block transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ease-out ${
            isHovering
              ? "w-12 h-12 bg-street-neon/20 border border-street-neonDark"
              : "w-3 h-3 bg-street-black"
          }`}
        />
      </div>
      <div
        className={`fixed pointer-events-none z-[9998] hidden md:block transition-opacity duration-200 ${
          isVisible ? "opacity-40" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border border-street-black/30 transition-all duration-300 ease-out ${
            isHovering ? "w-16 h-16 border-street-neonDark/50" : "w-10 h-10"
          }`}
        />
      </div>
    </>
  );
}
