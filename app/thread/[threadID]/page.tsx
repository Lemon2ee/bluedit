import { headers } from "next/headers";
import Navbar from "@/app/home/NavBar/navbar";
import ThreadContent from "@/app/thread/[threadID]/threadContent";
import { Thread } from "@/types/thread";

async function getThread(threadID: string): Promise<Thread> {
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/thread/${threadID}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function ThreadPage({
  params,
}: {
  params: {
    threadID: string;
  };
}) {
  const thread = await getThread(params.threadID);
  return (
    <>
      <Navbar />
      <ThreadContent thread={thread} />
    </>
  );
}
