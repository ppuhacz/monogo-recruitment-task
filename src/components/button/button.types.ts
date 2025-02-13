import type { Snippet } from "svelte";

export type ButtonProps = {
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | null | undefined;
  onclick?: () => void;
  children: Snippet;
};
