export {default} from "next-auth/middleware";

export const config = {
    matcher: [

        "/profile/edit",
        "/api/thread/:threadID/createComment",
        "/api/thread/:threadID/upvote",
        "/api/thread/",
    ],
};
