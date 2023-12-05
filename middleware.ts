import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
  const login = request.cookies.get("next-auth.session-token") !== undefined;

  const response = NextResponse.next();
  response.cookies.set("login", login.toString());
  return response;
}

// export const config = {
//   matcher: [
//     "/profile/edit",
//     "/api/thread/:threadID/createComment",
//     "/api/thread/:threadID/upvote",
//     "/api/thread/",
//   ],
// };
