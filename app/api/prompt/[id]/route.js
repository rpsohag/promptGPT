import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response("Prompts not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const ExistingPrompt = await Prompt.findById(params.id);
    if (!ExistingPrompt) {
      return new Response("Prompts not found", { status: 404 });
    }
    ExistingPrompt.prompt = prompt;
    ExistingPrompt.tag = tag;
    ExistingPrompt.save();

    return new Response(JSON.stringify(ExistingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt Deleted Successfully!", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompts", { status: 500 });
  }
};
