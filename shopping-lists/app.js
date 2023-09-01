import { serve } from "./deps.js";
import { configure } from "./deps.js";

configure({
    views: `${Deno.cwd()}/views/`,
  });

const handleRequest = async (request) => {
  console.log("Responding with Hello world!");
  return new Response("Hello world!");
};

serve(handleRequest, { port: 7777 });