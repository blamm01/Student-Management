require('dotenv').config()

const express = require("express");
const path = require("path")

const WebsiteRouter = require("./routes/website");
const APIRouter = require("./routes/api")

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views/"))

app.use("/", WebsiteRouter);
app.use("/api", APIRouter)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})