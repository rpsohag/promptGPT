"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, []);
  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are your sure?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt?._id.toString()}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
    }
    const filterPrompts = prompts.filter((p) => p._id !== prompt._id);
    setPrompts(filterPrompts);
  };

  return (
    <Profile
      name="my"
      desc="welcome"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
