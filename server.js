require('dotenv').config();

const express = require('express');
const cors = require('cors');

const agentRoutes = require('./routes/agenteRoutes.js');
const caseRoutes = require('./routes/casoRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/agentes', agentRoutes);
app.use('/casos', caseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));