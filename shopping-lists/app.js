import { serve } from "./deps.js";
import { configure } from "./deps.js";

configure({
    views: `${Deno.cwd()}/views/`,
  });

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (request)
  return new Response("Hello world!");
};

serve(handleRequest, { port: 7777 });