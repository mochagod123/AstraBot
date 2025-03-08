const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("config/database.db");

module.exports = async (query) => {
    db.run(query);
};
