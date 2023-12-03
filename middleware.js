export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile",
    "/profile/edit",
    "/api/thread/*/createComment",
    "/api/thread/*/upvote",
    "/api/thread/",
  ],
};
