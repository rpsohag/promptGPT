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
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPrompts(data);
  };
  useEffect(() => {
    fetchPrompts();
  }, []);

  const filterPrompts = (stext) => {
    const regex = new RegExp(stext, "i");
    return prompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

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
      {searchText ? (
        <PromptCartList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCartList data={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
