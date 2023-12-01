import Header from "@/app/profile/header";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { getServerSession } from "next-auth";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return null;

  return (
    <>
      <Header id={session?.user.id} />
    </>
  );
}
