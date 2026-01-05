// /app/utils/device.ts

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false; // SSR-safe
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
};
