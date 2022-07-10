const express = require('express');
const fs = require("fs");
const path = require('path')
const utils = require("../utils/")

const Router = express.Router();

let mainDir = __dirname.indexOf("src") !== -1 ? __dirname.slice(0, (__dirname.indexOf("src") - 1)) : -1;

Router.get("/", (req, res) => {
    res.redirect("/")
})

Router.get("/list", async(req, res) => {
    if(mainDir == -1) return res.send({
        error: "Không tìm thấy thư mục 'src'"
    })
    let datas = await fs.readFileSync(path.join(mainDir + "/students.txt"), "utf8");
    datas = utils.convert("txt-js", datas)

    return res.status(200).send({
        data: datas
    })
})

Router.post("/add", async(req, res) => {
    const id = req.body["id"]
    const name = req.body["name"];

    const math = req.body["math"];
    const literature = req.body["literature"];
    const foreign = req.body["foreign"];

    if(!id || !name || !math || !literature || !foreign) return res.status(400).send({
        error: "Thiếu mã học sinh, tên học sinh, điểm một trong ba môn Toán, Văn, Anh"
    });
    
    let total = req.body["total"] || (math + literature) * 2 + foreign;

    const oldDatas = await fs.readFileSync(path.join(mainDir + "/students.txt"), "utf8");

    const userData = {
        id,
        name,
        math,
        literature,
        foreign,
        total
    }

    const oldDatasJS = utils.convert("txt-js", oldDatas);
    
    if(oldDatasJS.find(v => v.id === userData.id)) return res.send({
        error: "Tìm thấy một hồ sơ khác trùng mã học sinh!"
    })

    const txtData = utils.convert("js-txt", [userData]);

    const newDatas = oldDatas + "\n" + txtData;

    await fs.writeFileSync(path.join(mainDir + "/students.txt"), newDatas, "utf8");

    return res.status(201).send({
        data: userData
    })
})

Router.post("/remove", async(req, res) => {
    const id = req.body["id"];

    if(!id) return res.status(400).send({
        error: "Thiếu mã học sinh!"
    });

    const oldDatas = await fs.readFileSync(path.join(mainDir + "/students.txt"), "utf8");

    const oldDatasJS = utils.convert("txt-js", oldDatas);
    
    if(!oldDatasJS.find(v => v.id === id)) return res.send({
        error: "Không tìm thấy hồ sơ nào có ID trùng khớp!"
    })

    const newDatasJS = oldDatasJS.filter(v => v.id !== id);

    const newDatas = utils.convert("js-txt", newDatasJS);

    await fs.writeFileSync(path.join(mainDir + "/students.txt"), newDatas, "utf8");

    return res.status(204).send()
})

Router.post("/edit", async(req, res) => {
    const id = req.body["id"];

    const math = req.body["math"];
    const literature = req.body["literature"];
    const foreign = req.body["foreign"];
    const total = req.body["total"]

    if(!id) return res.status(400).send({
        error: "Thiếu mã học sinh!"
    });

    const oldDatas = await fs.readFileSync(path.join(mainDir + "/students.txt"), "utf8");

    const oldDatasJS = utils.convert("txt-js", oldDatas);
    
    if(!oldDatasJS.find(v => v.id === id)) return res.send({
        error: "Không tìm thấy hồ sơ nào có ID trùng khớp!"
    })

    let userData = oldDatasJS.find((v) => v.id == id);

    let oldUserDataTXT = utils.convert('js-txt', [userData]);

    if(userData.math !== math && Number.parseInt(math)) userData.math = math
    if(userData.literature !== literature && Number.parseInt(literature)) userData.literature = literature
    if(userData.foreign !== foreign && Number.parseInt(foreign)) userData.foreign = foreign
    if(userData.total !== total && Number.parseInt(total)) userData.total = total

    let newUserDataTXT = utils.convert('js-txt', [userData]);
    
    let newDatas = oldDatas.replace(oldUserDataTXT, newUserDataTXT);

    await fs.writeFileSync(path.join(mainDir + "/students.txt"), newDatas, "utf8");

    return res.status(204).send()
})

module.exports = Router;