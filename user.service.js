const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(`INSERT INTO users_data SET ?`, [data], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    getUsers: callback => {
        pool.query("SELECT * FROM users_data", [], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        })
    }, 
    getUserById: (id, callback) => {
        pool.query("SELECT * FROM users_data WHERE user_id = ?", [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    },
    updateUser: (data, callback) => {
        pool.query("UPDATE users_data SET ? WHERE user_id = ?", [data, data.user_id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
    },
    deleteUser: (id, callback) => {
        pool.query("DELETE FROM users_data WHERE user_id = ?", [id], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        })
    },
    getUserByEmail: (email, callback) => {
        pool.query("SELECT * FROM users_data WHERE email_address = ?", [email], (error, results, fields) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results[0]);
            }
        });
    }
}