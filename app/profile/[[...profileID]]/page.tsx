import Navbar from "@/app/home/NavBar/navbar";
import Header from "@/app/profile/header";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { $Enums } from ".prisma/client";
import Role = $Enums.Role;

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
  if (!session?.user.id || !session.user.role) return null;

  if (params.profileID == undefined) {
    profileUserID = session?.user?.id;
    editable = true;
  } else if (params.profileID.length == 1) {
    profileUserID = params.profileID[0];
    editable = session.user.role === Role.ADMIN;
  }

  return (
    <>
      <Navbar />
      <Header editable={editable} profileUserID={profileUserID} />
    </>
  );
}
