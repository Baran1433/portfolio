import { useSmoothScroll } from "../providers/SmoothScrollProvider";

export function useScrollProgress() {
  const { progress } = useSmoothScroll();
  return progress;
}
