import {
  API_URL,
  AUTH_HEADER_NAME,
} from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json();

  return await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(async (res) => {
      if (res.error) {
        return new Response(JSON.stringify(res), {
          status: 401,
        });
      } else {
        const token = res.data.api_token;
        return new Response(JSON.stringify(res), {
          status: 200,
          headers: {
            'Set-Cookie': `${AUTH_HEADER_NAME}=${token};path=/`,
          },
        });
      }
    })
    .catch((err) => {
      return new Response(err, {
        status: 400,
      });
    });
}
