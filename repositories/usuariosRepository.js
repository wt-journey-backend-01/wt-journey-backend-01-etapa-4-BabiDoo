const db = require('../db/db');

const create = async (data)  => {
    const [row] = await db('usuarios').insert({
        nome: data.nome,
        email: data.email,
        senha: data.senha
    }).returning(['nome', 'email']);
    return row;
}


const find = async (email) => {
    if (typeof email !== 'string' || !email.trim()) return null;
    const row = await db('usuarios').where({ email }).first();
    return row;
}

module.exports = { create, find };