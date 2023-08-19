"use client";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPrompts, setUserPrompts] = useState([]);
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/prompts`);
      const data = await response.json();
      setUserPrompts(data);
    };
    if (params?.id) fetchPrompts();
  }, []);
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPrompts}
    />
  );
};

export default UserProfile;
