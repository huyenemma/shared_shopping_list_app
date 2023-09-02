import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js"
import * as itemController from "./controllers/itemController.js"
import * as requestUtils from "./utils/requestUtils.js"


configure({
    views: `${Deno.cwd()}/views/`,
  });

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname; 

  if (path === "/lists" && request.method === "GET") {
    return 
  } 
};

serve(handleRequest, { port: 7777 });