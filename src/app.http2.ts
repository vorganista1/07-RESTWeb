import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {

     console.log(req.url);

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write('<h1>Hello, World!</h1>');
    // res.write('<p>This is a simple HTTP server using Node.js.</p>');
    // res.write('<p>Current date and time: ' + new Date().toLocaleString() + '</p>');
    // res.write('<p>Request headers: ' + JSON.stringify(req.headers) + '</p>');
    // res.write('<p>Request method: ' + req.method + '</p>');
    // res.write('<p>Request URL: ' + req.url + '</p>');
    // res.end();


    // const data = {name: 'John Doe', age: 30, city: 'New York'};
    // res.writeHead(200, { 'Content-Type': 'application/json' }); 
    // res.end(JSON.stringify(data));      
    
    if(req.url==='/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
       return;

      }
    if(req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    
    if(req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    } 
  
try{
      const responseContent = fs.readFileSync(`./public${ req.url}`, 'utf-8');
      res.end(responseContent);
    
}catch(error){
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end();
}   


    

    
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
