// get请求
// const http = require("http");
// const querystring = require("querystring");

// const server = http.createServer((req, res) => {
//   console.log("request method: ", req.method);
//   const url = req.url;
//   req.query = querystring.parse(url.split("?")[1]);
//   console.log("request query string: ", req.query);
//   res.end(JSON.stringify(req.query));
// });

// server.listen(8000, () => {
//   console.log("listen 8000");
// });

// post请求
// const http = require("http");
// const server = http.createServer((req, res) => {
//   console.log("request method: ", req.method);
//   if (req.method === "POST") {
//     // req数据格式
//     console.log("request content type: ", req.headers["content-type"]);
//     // 接收数据
//     let postData = "";
//     req.on("data", (chunk) => {
//       postData += chunk.toString();
//     });
//     res.end(() => {
//       console.log(postData);
//     });
//   } else {
//     res.end(() => {
//       console.log("hello");
//     });
//   }
// });

// server.listen(8000, () => {
//   console.log("listen 8000");
// });

// 综合示例 POST+GET
const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  const query = querystring.parse(url.split("?")[1]);

  // 设置返回数据格式为JSON
  // 规定字符串为JSON格式
  res.setHeader("content-type", "application/json");

  // 设置返回的数据
  const resData = {
    method,
    url,
    path,
    query,
  };

  if (method === "POST") {
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      resData.postData = postData;
      res.end(() => {
        JSON.stringify(resData);
      });
    });
  } else if (method === "GET") {
    res.end(() => {
      JSON.stringify(resData);
    });
  }
});

server.listen(8000, () => {
  console.log("listen 8000");
});
