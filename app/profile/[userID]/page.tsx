import Navbar from "@/app/home/navbar";
import Header from "@/app/profile/header";

export default async function PublicProfile({
  params,
}: {
  params: {
    userID: string;
  };
}) {
  const userID = params.userID;
  if (!userID) return null;

  return (
    <>
      <Navbar />
      <Header id={userID} />
    </>
  );
}
