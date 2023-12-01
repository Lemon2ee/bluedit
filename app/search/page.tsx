"use client";

import React from "react";
import SearchResultList from "@/app/search/resultList";
import SearchHeader from "@/app/search/header";

export default function SearchResult() {
  return (
    <div className={"flex justify-center flex-col"}>
      <div className="row">
        <SearchHeader />
      </div>
      <div className="row">
        <SearchResultList />
      </div>
    </div>
  );
}
