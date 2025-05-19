'use server';

export async function getCookieOnServer(name: string) {
  const { cookies: getCookies } = await import('next/headers');
  const cookies = await getCookies();

  const value = cookies.get(name)?.value;
  return value;
}