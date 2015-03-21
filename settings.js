
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
  options:{
    rootdir: path.join(__dirname, 'public'),
    filter: {
      "[\\.-]min\\.js$": ".min.js",
      "[\\.-]min\\.css$": ".min.css"
    },
    //supportedFIle: '\\.map',
    "charset": "utf-8",
    urls:{
    }
  }
}
