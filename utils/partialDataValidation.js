const { agentSchema } = require('../utils/agentValidation.js');
const { caseSchema }   = require('../utils/caseValidation.js');

const agentPatchSchema = agentSchema.partial();
const casePatchSchema  = caseSchema.partial();

module.exports = { agentPatchSchema, casePatchSchema };

