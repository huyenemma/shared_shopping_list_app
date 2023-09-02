import { renderFile } from "../deps.js"
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const showMainPage = async (request) => {
    const listCount = await listService.countLists();
    const itemCount = await itemService.countItems(); 

    const data = {
        listCount,
        itemCount, 
    };

    return new Response(await renderFile("main.eta", data), responseDetails);
};

export { showMainPage };

