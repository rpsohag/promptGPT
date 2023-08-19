"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCartList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);
  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    };
    fetchPrompts();
  }, []);
  return (
    <section className="feed">
      <form className="w-full flex-center relative">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCartList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
