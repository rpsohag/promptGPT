import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} & Share incredible prompts globally, and unleash your creativity
        on any AI-driven platform. Let your imagination soar boundlessly.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-inter font-semibold text-base text-gray-700">
            Your AI-Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your ai prompt here"
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-inter font-semibold text-base text-gray-700">
            Tag <span>( #chatGPT, #googleBard, #web )</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Write your ai prompt here"
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-blue-900 text-white rounded-full "
          >
            {submitting ? `${type}` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
