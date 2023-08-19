import Feed from "@components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        FindOut & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Power Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptGPT is an AI prompting tool for modern world to findout, create
        and share your creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
