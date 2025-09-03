const db = require('../db/db.js');

// GET /agentes
async function getAllAgents(req, res, next) {
  try {
    const { cargo, sort } = req.query;

    let q = db('agentes').select('*');
    if (cargo) q = q.where({ cargo });

    // sort: ex. "nome" ou "-dataDeIncorporacao"
    if (sort) {
      const dir = sort.startsWith('-') ? 'desc' : 'asc';
      const col = sort.replace(/^-/, '');
      q = q.orderBy(col, dir);
    } else {
      q = q.orderBy('id', 'asc');
    }

    const rows = await q;
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /agentes/:id
async function getAgentById(req, res, next) {
  try {
    const { id } = req.params;
    const row = await db('agentes').where({ id }).first();
    if (!row) return res.status(404).json({ message: 'Agente não encontrado' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

// POST /agentes
async function createAgent(req, res, next) {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const [row] = await db('agentes')
      .insert({ nome, dataDeIncorporacao, cargo })
      .returning('*');
    res.status(201).json(row);
  } catch (err) {
    next(err);
  }
}

// PUT /agentes/:id
async function updateAgent(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const [row] = await db('agentes')
      .where({ id })
      .update({ nome, dataDeIncorporacao, cargo })
      .returning('*');
    if (!row) return res.status(404).json({ message: 'Agente não encontrado' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

// PATCH /agentes/:id
async function patchAgent(req, res, next) {
  try {
    const { id } = req.params;
    const payload = {};
    ['nome', 'dataDeIncorporacao', 'cargo'].forEach(k => {
      if (req.body[k] !== undefined) payload[k] = req.body[k];
    });

    const [row] = await db('agentes').where({ id }).update(payload).returning('*');
    if (!row) return res.status(404).json({ message: 'Agente não encontrado' });
    res.json(row);
  } catch (err) {
    next(err);
  }
}

// DELETE /agentes/:id
async function deleteAgent(req, res, next) {
  try {
    const { id } = req.params;
    const count = await db('agentes').where({ id }).del();
    if (!count) return res.status(404).json({ message: 'Agente não encontrado' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// GET /agentes/:id/casos
async function getCasesByAgent(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await db('casos').where({ agente_id: id }).orderBy('id', 'asc');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  patchAgent,
  deleteAgent,
  getCasesByAgent,
};
