import { renderFile } from "../deps.js"
import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItem = async (request) => { 
    const formData = await request.formData(); 
    const name = formData.get("name"); 

    const url = new URL(request.url);
    const listId = url.pathname.split("/")[2];

    await itemService.createItem(listId, name); 

    return requestUtils.redirectTo(`/lists/${listId}`); 
};

const showItems = async (request) => { 
    const url = new URL(request.url); 
    const listId = url.pathname.split("/")[2];

    const items = await itemService.findItemByListId(listId);
    const list_contain_item = await listService.findListById(listId); 

    const data = {
        listId: listId,
        listName: list_contain_item.name,
        uncollectedItems: items.filter(item => !item.collected),
        collectedItems: items.filter(item => item.collected),
    }; 

    return new Response(await renderFile("items.eta", data), responseDetails);
}

const markItemCollected = async (request) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const listId = pathParts[2];
    const itemId = pathParts[4];

    await itemService.markItemCollected(itemId);

    return requestUtils.redirectTo(`/lists/${listId}`); 
}

export { addItem, showItems, markItemCollected }; 