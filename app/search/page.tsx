"use client";

import React from "react";
import SearchResultList from "@/app/search/resultList";

export default function SearchResult() {
  return (
    <div className={"flex justify-center flex-col"}>
      <div className="row">
        <SearchResultList />
      </div>
    </div>
  );
}
