import Navbar from "@/app/home/NavBar/navbar";
import ThreadList from "@/app/common/threadList";
import prisma from "@/lib/prisma";
import { ThreadWithProfile } from "@/types/thread";

function getRandomMessage(): string {
  const messages: string[] = [
    "Your Community, Your Voice",
    "Sup, did you play Minecraft today?",
    "Explore New Perspectives, Join the Conversation",
    "Hello, What's on Your Mind Today?",
    "Dive into Discussions That Matter",
    "Greetings, Trailblazer! What's Your Next Discovery?",
    "Got Something to Share? We're All Ears!",
    "Welcome Back! Discover What's Trending Now",
    "Hello Explorer, Uncover New Topics Today",
    "What's Your Story? Let's Hear It",
    "Connect, Share, Engage – Make Your Day Count",
    "Ready for Today's Adventure in Ideas?",
    // Add more messages as needed
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

async function getAllThreads() {
  return prisma.thread.findMany({
    include: {
      author: {
        include: {
          profile: true,
        },
      },
    },
  });
}

export default async function Home() {
  const threads: ThreadWithProfile[] = await getAllThreads();

  return (
    <>
      <Navbar />
      <ThreadList welcomeMessage={getRandomMessage()} threads={threads} subWelcomeMessage={"Welcome to Bluedit"} />
    </>
  );
}
