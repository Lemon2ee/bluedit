import Navbar from "@/app/home/navbar";
import { headers } from "next/headers";
import { ProfileData } from "@/lib/type";
import Header from "@/app/profile/header";

async function getProfile(id: string) {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/profile/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PublicProfile({
  params,
}: {
  params: {
    userID: string;
  };
}) {
  const userID = params.userID;
  if (!userID) return null;

  const profile: ProfileData = await getProfile(userID);

  if (
    !profile ||
    !profile.profilePicture ||
    !profile.bannerPicture ||
    !profile.displayName
  )
    return null;

  return (
    <>
      <Navbar />
      <Header
        profilePicture={profile.profilePicture}
        bannerPicture={profile.bannerPicture}
        name={profile.displayName}
        edit={profile.edit || false}
      />
    </>
  );
}
