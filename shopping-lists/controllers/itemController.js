import { renderFile } from "../deps.js"
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => { 
    const formData = await request.formData(); 
    const listId = formData.get("list_id"); 
    const name = formData.get("name"); 

    await itemService.createItem(listId, name); 

    return requestUtils.redirectTo('/lists/${listId}'); 
};

const showItem = async (request) => { 
    const url = new URL(request.url); 
    const urlparts = url.pathname.split("/");

    const data = {
        items: await itemService.findItemByListId(urlparts[2]),
    }

    return new Response(await renderFile("item.eta", data), responseDetails);
}

const markItemCollected = async (request) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const listId = pathParts[2];
    const itemId = pathParts[4];

    await itemService.markItemCollected(itemId);

    return requestUtils.redirectTo(`/lists/${listId}`); 
}

export { addItem, showItem, markItemCollected }; 