"use client";

import { useEffect, useState } from "react";
import Header from "@/app/profile/header";

export default function Profile() {
  const [profile, setProfile] = useState({
    bio: "",
    profilePicture: "",
    bannerPicture: "",
    displayName: "",
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          bio: data.bio,
          profilePicture: data.profilePicture,
          bannerPicture: data.bannerPicture,
          displayName: data.displayName,
        });
      });
  }, []);

  return (
    <>
      <Header
        bannerPicture={profile.bannerPicture}
        profilePicture={profile.profilePicture}
        name={profile.displayName}
      />
    </>
  );
}
