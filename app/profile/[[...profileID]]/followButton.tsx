"use client";

import { PencilSquareIcon } from "@heroicons/react/20/solid";
import React from "react";
import { usePathname } from "next/navigation";

async function HandleFollow({
  e,
  id,
}: {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  id: string;
}) {
  e.preventDefault();

  fetch(`/api/profile/follow/${id}`, {
    method: "POST",
  }).then(async (res) => {
    if (!res.ok) {
      window.alert(await res.text());
    }
  });
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
    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
      <div className="relative flex  justify-end">
        <button
          onClick={(e) => HandleFollow({ e, id })}
          className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PencilSquareIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>Follow</span>
        </button>
      </div>
    </div>
  );
}
