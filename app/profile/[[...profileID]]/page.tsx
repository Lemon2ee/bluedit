import Navbar from "@/app/home/NavBar/navbar";
import Header from "@/app/profile/header";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { $Enums } from ".prisma/client";
import Role = $Enums.Role;
import prisma from "@/lib/prisma";
import ProfileCommentsList from "@/app/profile/[[...profileID]]/profileCommentsList";
import FollowSection from "@/app/profile/[[...profileID]]/followSection";
import FollowButton from "@/app/profile/[[...profileID]]/followButton";

export interface CommentWithThreadInfo {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  threadId: string;
  thread: {
    createdAt: Date;
    title: string;
  };
}

async function getUserComments(userID: string) {
  return prisma.comment.findMany({
    where: {
      authorId: userID,
    },
    include: {
      thread: {
        select: {
          createdAt: true,
          title: true,
        },
      },
    },
  });
}

export default async function PublicProfile({
  params,
}: {
  params: {
    profileID: string[];
  };
}) {
  let profileUserID = "";
  let editable = false;
  const session = await getServerSession(authOptions);
  let isSelf = false;

  if (params.profileID == undefined) {
    if (!session?.user.id || !session.user.role) return null;
    profileUserID = session?.user?.id;
    editable = true;
    isSelf = true;
  } else if (params.profileID.length == 1) {
    profileUserID = params.profileID[0];
    editable = session?.user.role === Role.ADMIN || false;
  }

  const comments: CommentWithThreadInfo[] =
    await getUserComments(profileUserID);

  return (
    <>
      <Navbar />
      <Header editable={editable} profileUserID={profileUserID} />
      {!isSelf && <FollowButton />}
      <FollowSection profileUserID={profileUserID} />
      <ProfileCommentsList comments={comments} />
    </>
  );
}
