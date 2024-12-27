const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: { type: String, required: [true, "Role name is required"] },
    permissions: [{ type: String }]
});

module.exports = mongoose.model('Role', roleSchema);