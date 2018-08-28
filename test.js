var http = require("https");

var options = {
  "method": "POST",
  "hostname": 'github.com',
  "path": [
    "login",
    "oauth",
    "access_token"
  ],
  "headers": {
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    "Cache-Control": "no-cache",
    "Postman-Token": "3c4a1800-c694-4e03-bc8d-ce7c3de2dc3c"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"client_id\"\r\n\r\n87ba5c2e8f3c6bbb0773\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"client_secret\"\r\n\r\n8ed6abf8e58b58874ddc8501d7a5d04367fc33d8\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"code\"\r\n\r\nda07f4a1552f59ca52f1\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--");
req.end();
