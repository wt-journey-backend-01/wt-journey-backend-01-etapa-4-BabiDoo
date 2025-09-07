require('dotenv').config();

const express = require('express');
const cors = require('cors');

const agentesRoutes = require('./routes/agentesRoutes.js');
const casosRoutes = require('./routes/casosRoutes.js');
const errorHandler = require('./utils/errorHandler.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
