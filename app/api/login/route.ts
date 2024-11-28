import {
  API_URL,
  AUTH_HEADER_NAME,
} from "@/lib/constants";
import {MainError, ResponseError} from "@lib/errors";

export async function POST(request: Request) {
  const body = await request.json();
  return await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      const JSONData = await res.json();
      return {
        ...JSONData,
        status: res.status,
      };
    })
    .then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        const token = res.bearer;
        return new Response(JSON.stringify(res), {
          status: res.status,
          headers: {
            'Set-Cookie': `${AUTH_HEADER_NAME}=${token};path=/`,
          },
        });
      } else {
        return new Response(JSON.stringify(res), {
          status: res.status,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return new Response(JSON.stringify(new ResponseError({
        errors: [],
        type: 'InternalServerError',
        title: MainError.getStatusMessage(500),
        status: 500,
      })), {
        status: 500,
      });
    });
}
