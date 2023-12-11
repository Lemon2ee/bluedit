"use client";

import { PencilSquareIcon } from "@heroicons/react/20/solid";
import React, { MouseEventHandler } from "react";
import { usePathname } from "next/navigation";

function HandleFollow({
  e,
  id,
}: {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  id: string;
}) {
  e.preventDefault();

  fetch(`/api/profile/follow/${id}`, {
    method: "POST",
  }).then((res) => {});
}

function extractIdFromPath(path: string): string {
  const parts = path.split("/");
  // Assuming the ID is always after 'profile'
  const profileIndex = parts.indexOf("profile");
  if (profileIndex !== -1 && profileIndex < parts.length - 1) {
    return parts[profileIndex + 1];
  }
  return ""; // Return an empty string or handle as needed if 'profile' is not found
}

export default function FollowButton() {
  const pathname = usePathname();
  const id = extractIdFromPath(pathname);
  console.log(id);

  return (
    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div
        onClick={(e) => HandleFollow({ e, id })}
        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <PencilSquareIcon
          className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <span>Follow</span>
      </div>
    </div>
  );
}
