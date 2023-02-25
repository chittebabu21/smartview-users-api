require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/users/user.router");

app.use(express.json());

app.use("/routes/users", router);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port: ${process.env.APP_PORT}`);
})