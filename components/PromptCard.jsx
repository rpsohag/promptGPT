"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold font-inter text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt ? "./icons/tick.svg" : "/icons/copy.svg"
            }
            alt="user image"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-inter text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blug_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        #{prompt.tag}
      </p>
      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-end gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm cursor-pointer bg-blue-900 text-white p-1"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer bg-red-500 text-white p-1"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
