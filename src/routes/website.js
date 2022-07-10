const express = require('express');
const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("index", {
        page: {
            title: "Trang chủ",
        }
    })
})

Router.get("/remove/", (req, res) => {
    res.render("remove", {
        page: {
            title: "Xóa",
        }
    })
})

Router.get("/add", (req, res) => {
    res.render("add", {
        page: {
            title: "Thêm",
        }
    })
})

Router.get("/edit", (req, res) => {
    res.render("edit", {
        page: {
            title: "Sửa",
        }
    })
})

Router.get("/view", (req, res) => {
    res.render("view", {
        page: {
            title: "Danh sách"
        }
    })
})

module.exports = Router;