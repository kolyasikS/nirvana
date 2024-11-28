'use server';
import {cookies as getCookies} from "next/headers";

export async function getCookieOnServer(name: string) {
  const cookies = await getCookies();

  return cookies.get(name)?.value;
}