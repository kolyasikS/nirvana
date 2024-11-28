'use client';

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookieOnClient(name: string) {
  const cookieArr = document.cookie.split(';');
  for (let cookie of cookieArr) {
    cookie = cookie.trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.split('=')[1];
    }
  }

  return null;
}