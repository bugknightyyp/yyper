
var path = require('path');
// db config
exports.app = {
  port: 4000
}

exports.db = {
  host: "localhost",
  port: "27017",
  dbName: "yyper",
  options: {}
}

exports.post = {
  postDir: path.join(process.cwd(),'posts'),
  configFileName: 'postfile.json',
}

exports.session = {
  key: "",
  secret: ""
}

exports.cookie = {

}

exports.flexCombo = {
  urls:{
    "\\css": __dirname +"/public/css",
    "\\js": __dirname +"/public/js",
    "/css": __dirname +"/public/css",
    "/js": __dirname +"/public/js"
  },
  options:{
    "charset": "utf-8",
    "supportedFile": "\\.js$|\\.css$"
  }
}
