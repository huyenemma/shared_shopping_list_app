import {sql} from "../database/database.js"

const createList = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`; 
}

const findActiveList = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
}

const deactivateById = async (id) => {
    await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`; 
}

const countLists = async () => {
    const result = await sql`SELECT COUNT(*) as count FROM shopping_lists`;
    return result[0]?.count || 0;
}


export { createList, findActiveList, deactivateById, countLists };