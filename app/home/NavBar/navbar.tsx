import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { getServerSession } from "next-auth";
import MainBar from "@/app/home/NavBar/mainBar";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return <MainBar session={session} />;
}
