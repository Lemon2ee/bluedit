import FollowList from "@/app/profile/[[...profileID]]/followList";
import prisma from "@/lib/prisma";

export type commentUser = {
  displayName: string;
  id: string;
};

async function getFollowStat(profileUserID: string) {
  return prisma.profile.findUnique({
    where: {
      userId: profileUserID,
    },
    select: {
      follower: true,
      following: true,
    },
  });
}

async function getDisplayNames(profileIds: string[]) {
  const profiles = await prisma.profile.findMany({
    where: {
      id: {
        in: profileIds,
      },
    },
    select: {
      displayName: true,
      userId: true, // Fetch the userId
    },
  });

  return profiles.map((profile) => ({
    displayName: profile.displayName,
    id: profile.userId, // Return the User ID instead of the Profile ID
  }));
}

export default async function FollowSection({
  profileUserID,
}: {
  profileUserID: string;
}) {
  const followStat = await getFollowStat(profileUserID);

  if (followStat == undefined) return null;

  const follower = await getDisplayNames(followStat.follower);
  const following = await getDisplayNames(followStat.following);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8 py-10 sm:py-5 ">
      <div className="relative flex h-16 justify-center">
        <FollowList contentList={follower} menuName={"Follower"} />
        <FollowList contentList={following} menuName={"Following"} />
      </div>
    </div>
  );
}
