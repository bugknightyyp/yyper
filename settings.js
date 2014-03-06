	
// db config
exports.app = {
  port: 4000
}

exports.db = {
  host: "localhost",
  port: "27017",
  dbName: "yyper-blog",
  options: {}
}

exports.post = {
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
    "/css": "public\\css",
    "/js": "public\\js"
  },
  options:{
    "charset": "utf-8",
    "supportedFile": "\\.js|\\.css"
  }
}