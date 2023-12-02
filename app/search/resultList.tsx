import { ChevronRightIcon } from "@heroicons/react/20/solid";

const posts = [
  {
    title: "Hoyoverse: Genshin Impact 4.2 Incoming",
    shortContent:
      "The version 4.2 Banners debut new 5-Star character Furina, the Hydro Archon of Fontaine, and new 4-Star Charlotte.\n",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIOTjQn295QJG51JoDtCe-WZisHNK2j2d8g&usqp=CAU",
    href: "#",
    postedOn: "March 2, 2023",
  },
  {
    title: "Genshin Wish Stats",
    shortContent:
      "Wishes are the gacha system in Genshin Impact. There are two main types of Wishes: the permanent Standard Wish, Wanderlust Invocation, and limited-time Event Wishes for Characters and Weapons.",
    imageUrl: "https://cdn.mos.cms.futurecdn.net/5xNq659vCbF3GQBbSkc5SY.jpg",
    href: "#",
    postedOn: "October 10, 2023",
  },
  {
    title: "Genshin - HOYOverse ",
    shortContent:
      "At HoYoverse, we are committed to creating immersive virtual world experiences for players around the world. ",
    imageUrl:
      "https://c8.alamy.com/comp/2JP4789/cosplayer-as-xiao-from-genshin-impact-a-chinese-open-world-action-role-playing-game-character-portrait-mcm-comic-con-london-2JP4789.jpg",
    href: "#",
    postedOn: "November 13, 2023",
  },
];

export default function SearchResultList() {
  // Unfinished work:
  // 1. Backend search API [Search, Pagination]
  // 2. Get Profile data for each post: img
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li
          key={post.shortContent}
          className="relative flex justify-between gap-x-6 py-5"
        >
          <div className="flex gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50 mx-4"
              src={post.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                <a href={post.href}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {post.title}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {post.shortContent}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
