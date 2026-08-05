"use client";

import { Heart } from "lucide-react";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "kira-real-estate-favorites";
const FAVORITES_EVENT = "kira-favorites-change";

function readFavorites() {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [] as string[];
  }
}

export function FavoriteButton({ slug, label, className = "" }: { slug: string; label: string; className?: string }) {
  const isFavorite = useSyncExternalStore((onStoreChange) => {
    window.addEventListener(FAVORITES_EVENT, onStoreChange);
    window.addEventListener("storage", onStoreChange);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, onStoreChange);
      window.removeEventListener("storage", onStoreChange);
    };
  }, () => readFavorites().includes(slug), () => false);

  function toggleFavorite() {
    const current = readFavorites();
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }

  return (
    <button type="button" onClick={toggleFavorite} className={`icon-button ${isFavorite ? "bg-[var(--accent)] text-[var(--accent-ink)]" : ""} ${className}`} aria-label={`${isFavorite ? "Remove" : "Add"} ${label} ${isFavorite ? "from" : "to"} favorites`} aria-pressed={isFavorite}>
      <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
      <span className="sr-only" aria-live="polite">{isFavorite ? "Saved to favorites" : "Not saved"}</span>
    </button>
  );
}
