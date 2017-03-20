var connect = require('connect'),
    http = require('http'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    mock = require('./mock.js');

const SERVER_PORT = 8080;

console.log('home dir == ' + process.cwd());
console.log('port == ', SERVER_PORT);

var app = connect();

//static files
app.use(serveStatic('../../'));

//json dynamic data
app.use(bodyParser.json())
    .use(function(req, res, next) {
        console.log("\n\n" + req.method.toUpperCase() + " " + req.url + "  " + JSON.stringify(req.body));
        console.log("cookies:", req.headers.cookie);
        
        let ret;
        const {0:url, 1:qs} = req.url.split('?');
        const pos = url.lastIndexOf('/');
        const name = url.substring( pos >=0 ? pos+1 : 0)
        if (typeof mock[name] === 'function') {
            ret = mock[name](req.body, req.headers.cookie, qs);
        } else {
            console.log('>> not found');
            ret = {resultCode:-2, resultDescription:"MOCK NOT FOUND"}
        }

        var text = JSON.stringify(ret, null, 2);
        if (text.length > 1000) text = text.substring(0, 1000) + '...\n';
        console.log('>> ' + text);

	if (req.headers.origin) {
		//cors
	        res.setHeader('Access-Control-Allow-Credentials', 'true');
	        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	}

        res.setHeader('Content-Type', 'application/json');
        
        //emulate ping 1000ms
        setTimeout(function() {
            res.end(JSON.stringify(ret));
        }, 200);
    });

http.createServer(app).listen(SERVER_PORT);
