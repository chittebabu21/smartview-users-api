const { create, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } = require("./user.service");
const { hashSync, compare, genSaltSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const expire = 43200;
const { encrypt, decrypt } = require("../../auth/crypto");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const password = body.password;
        body.password = encrypt(password);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        create(body, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            }
        });
    },
    getUsers: (req, res) => {
        getUsers((error, results) => {
            if (error) {
                console.log(error);
                return;
            } else {
                return res.json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            } 
            if (!results) {
                return res.json({
                    success: 0, 
                    message: "Record not found..."
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        // body.password = encrypt(body.password);
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (error, results) => {
            if (error) {
                console.log(error);
                return;
            } 
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user..."
                })
            }
            return res.json({
                success: 1, 
                message: "Updated successfully!"
            });
        });
    }, 
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (error, results) => {
            if (error) {
                console.log(error);
                return;
            } 
            // if (!results) {
            //     return res.json({
            //         success: 0,
            //         message: "Record not found..."
            //     });
            // }
            return res.json({
                success: 1, 
                message: "User deleted successfully!"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email_address, (error, results) => {
            if (error) {
                console.log(error);
            } 
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password..."
                });
            }
            // const result = compare(body.password, results.password);
            const password = decrypt(results.password);
            if (password === body.password) {
                results.password = undefined;
                const jsonToken = sign({ result: results }, process.env.JSON_TOKEN, {
                    expiresIn: expire
                });
                return res.json({
                    success: 1, 
                    message: "Login successful!",
                    accessToken: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password..."
                });
            }
        });
    }
}