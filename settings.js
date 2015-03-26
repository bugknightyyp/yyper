
var path = require('path');

var dev = {}
var pro = {}
if (process.env.NODE_ENV == 'development'){
  module.exports = dev
} else {
  module.exports = pro
}

// db config
pro.app = {
  port: 80
}

dev.app = {
  port: 4000
}


pro.db = dev.db = {
  host: "localhost",
  port: "27017",
  dbName: "yyper",
  options: {}
}

pro.post = dev.post = {
  postDir: path.join(process.cwd(),'posts'),
  configFileName: 'postfile.json',
}

pro.session = dev.session = {
  key: "",
  secret: ""
}

pro.cookie =  dev.cookie = {

}

pro.flexCombo = dev.flexCombo = {
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
