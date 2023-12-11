import FollowList from "@/app/profile/[[...profileID]]/followList";
import prisma from "@/lib/prisma";

async function getFollower(profileUserID: string) {
  const result = await prisma.profile.findUnique({
    where: {
      id: profileUserID,
    },
    select: {
      follower: true,
    },
  });

  return result?.follower;
}

export default async function FollowSection({
  profileUserID,
}: {
  profileUserID: string;
}) {
  const follower = await getFollower(profileUserID);
  if (follower == undefined) return null;

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8 py-28 sm:py-10 ">
      <div className="relative flex h-16 justify-center">
        <FollowList contentList={follower} />
        <FollowList contentList={follower} />
      </div>
    </div>
  );
}
