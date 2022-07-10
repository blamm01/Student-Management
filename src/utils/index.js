const fs = require("fs");


module.exports = {
    convert: (type = "txt-js", datas) => {
        if (type == "txt-js") {
            datas = datas.split("\n").map((stringData) => {
                const data = stringData.split(";");
                return {
                    id: data[0],
                    name: data[1],
                    math: data[2],
                    literature: data[3],
                    foreign: data[4],
                    total: data[5]
                }
            })
            datas = datas.filter((v) => v.id && v.name && v.math && v.literature && v.foreign && v.total)
        } else if (type == "js-txt") {
            datas = datas.map((data) => {
                let string = '';
                Object.keys(data).map((key) => {
                    string += `${data[key]};`
                })

                string = string.slice(0, string.length - 1)

                return string;
            }).join("\n")
        } else {
            console.log("Invalid convert type!");
            return null;
        }
        return datas;
    }
}