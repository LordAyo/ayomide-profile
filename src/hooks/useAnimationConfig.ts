import { useState, useEffect } from "react";

interface AnimationConfig {
  hoverAnimation: any;
  expandedAnimation: any;
  textAnimation: (delay: number) => any;
  socialAnimation: (delay: number) => any;
}

export const useAnimationConfig = (): AnimationConfig => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const hoverAnimation = prefersReducedMotion
    ? { filter: "grayscale(0%)" }
    : {
        scale: 1.05,
        filter: "grayscale(0%)",
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
      };

  const expandedAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
        transition: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
        },
      };

  const textAnimation = (delay: number) =>
    prefersReducedMotion
      ? { opacity: 1 }
      : {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { delay, duration: 0.5 },
        };

  const socialAnimation = (delay: number) =>
    prefersReducedMotion
      ? { opacity: 1 }
      : {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { delay, duration: 0.3 },
        };

  return {
    hoverAnimation,
    expandedAnimation,
    textAnimation,
    socialAnimation,
  };
};
