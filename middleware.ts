import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {API_URL, AUTH_HEADER_NAME, USER_ROLES} from "@lib/constants";

function redirect(request: NextRequest, redirectPath: string, searchParams: any = null) {
  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value as string);
    })
  }
  return NextResponse.redirect(url)
}
function isAuthorizedRoute(pathname: string, role: string) {
  switch (role) {
    case 'Housemaid':
    case 'Technician':
      return pathname.includes(`/worker`);
    default:
      return pathname.includes(`/${role.toLowerCase()}`);
  }
}

export async function authMiddleware(request: NextRequest, pathname: string) {
  const authToken = request.cookies.get(AUTH_HEADER_NAME)?.value;
  if (!authToken) {
    return redirect(request, "/login");
  }

  try {
    const res = await fetch(`${API_URL}/users/self`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${authToken}`,
      } as any,
    });

    if (!res.ok) {
      return redirect(request, "/login");
    }

    const resJSON = await res.json();

    if (!isAuthorizedRoute(pathname, resJSON.role)) {
      return redirect(request, "/login");
    }

    return NextResponse.next();

  } catch (error: any) {
    return redirect(request, "/login");
  }
}


export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  return authMiddleware(req, pathname);
}

export const config = {
  matcher: ['/admin/:path*', '/inventory-manager/:path*', '/manager/:path*', '/worker/:path*'],
};