import { renderFile } from "../deps.js"
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const addList = async (request) => {
    const formData = await request.formData(); 
    const name = formData.get("name");

    await listService.createList(name); 

    return requestUtils.redirectTo("/lists");
}

const showList = async (request) => { 
    const url = new URL(request.url);
    
    const data = {
        lists: await listService.findActiveList(),
    }

    return new Response(await renderFile("lists.eta", data), responseDetails);
}

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlparts = url.pathname.split("/");

    await listService.deactivateById(urlparts[2]); 

    return await requestUtils.redirectTo("/lists"); 
}


export { addList, showList, deactivateList }; 
