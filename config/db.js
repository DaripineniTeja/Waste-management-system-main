require("dotenv").config();

const { Pool } = require("pg"); // PostgreSQL client
const url = process.env.db_url;

if (!url) {
    throw new Error("Database URL not defined in environment variables");
}

let _pool;

module.exports = {
    connectToServer: async function (callback) {
        try {
            // Create a PostgreSQL connection pool
            _pool = new Pool({
                connectionString: url,
                ssl: {
                    rejectUnauthorized: false, // Enable SSL for secure connections
                },
            });

            // Test the connection
            const client = await _pool.connect();
            console.log("DB Connected");

            // Check and create table if not exists
            await client.query(createTableQuery);
            console.log("'users' table checked/created");

            client.release(); // Release the client back to the pool

            if (callback) callback(null); // No errors
        } catch (err) {
            console.error("Error connecting to the database", err);
            if (callback) callback(err); // Pass error to callback
        }
    },
    getPool: function () {
        if (!_pool) {
            throw new Error("Database not initialized. Call connectToServer first.");
        }
        return _pool;
    },
};
