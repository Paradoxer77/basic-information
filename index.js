const http = require("http");
const fs = require("fs");
const url = require("url");

let page404 = fs.readFileSync("404.html", (err, data) => {
  if (err) throw err;
  return data;
});

http
  .createServer((req, res) => {
    let q = url.parse(req.url, true);
    let filename = `.${q.pathname}`;
    if (filename === "./") {
      filename = "./index.html";
    }

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.write(page404);
        return res.end();
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
