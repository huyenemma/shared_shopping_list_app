import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listController from "./controllers/listController.js"
import * as itemController from "./controllers/itemController.js"
import * as mainPageController from "./controllers/mainPageController.js"

configure({
    views: `${Deno.cwd()}/views/`,
  });

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname; 

  if (path === "/" && request.method === "GET") {
    return await mainPageController.showMainPage(request);

  //list management
  } else if (path === "/lists" && request.method === "GET") {
    return await listController.showList(request); 
  } else if (path === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (path.match("^/lists/[0-9]+") && request.method === "GET") {
    return await itemController.showItems(request);
  } else if (path.match("^/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);

  //item management
  } else if (path.match("^/lists/[0-9]+/items$") && request.method === "POST") {
    return await itemController.addItem(request);
  } else if (path.match("^/lists/[0-9]+/items/[0-9]+/collect$") && request.method === "POST") { 
    return await itemController.markItemCollected(request);

  } else {
    return new Response("Not found", { status: 404 });
  };
  s
};

serve(handleRequest, { port: 7777 });