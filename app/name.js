const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1'
const port = 80;
let home = fs.readFileSync('./Home.html');
let contact = fs.readFileSync('./About.html');
let about = fs.readFileSync('./Contact.html');
const server = http.createServer((req,res)=>{
    res.setHeader('Content-type','text/html');
    res.statuscode = 200;
    res.end(home);
})
server.listen(port , hostname , ()=>{
    console.log(`Server is runnung at http://${hostname}:${port}/`);
})

