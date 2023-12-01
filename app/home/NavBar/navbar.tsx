import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { getServerSession } from "next-auth";
import MainBar from "@/app/home/NavBar/mainBar";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return null;

  return <MainBar session={session} />;
}
