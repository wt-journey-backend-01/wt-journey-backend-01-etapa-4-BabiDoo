require('dotenv').config();

const express = require('express');
const cors = require('cors');

const agentRoutes = require('./routes/agentesRoutes.js');
const caseRoutes = require('./routes/casosRoutes.js');
const errorHandler = require('./utils/errorHandler.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/agentes', agentRoutes);
app.use('/casos', caseRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
