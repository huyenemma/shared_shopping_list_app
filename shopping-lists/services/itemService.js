import {sql} from "../database/database.js"

const createItem = async (list_id, name) => {
    await sql`INSERT INTO shopping_list_items (shopping_list_id, name) 
    VALUES (${list_id}, ${name})`; 
}

const findItemByListId  = async (list_id) => { 
    return await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id = ${list_id}
    ORDER BY collected ASC, name ASC`; 
}

const markItemCollected = async (itemId) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${itemId}`; 
}

const findItemsCount = async () => {
    const result = await sql`SELECT COUNT(*) as count FROM shopping_list_items`;
    return result[0]?.count || 0;
}

export { createItem, findItemByListId, markItemCollected, findItemsCount };