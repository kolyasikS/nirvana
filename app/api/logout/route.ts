import {
  AUTH_HEADER_NAME,
} from "@/lib/constants";

export async function GET() {
  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': `${AUTH_HEADER_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`,
    },
  });
}
