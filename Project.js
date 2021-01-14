var express = require("express");
var app = express();
var path = require('path');
var server = require('http').Server(app);
const https = require('https');
var bodyParser = require('body-parser')
app.use(bodyParser.json());
const fs = require('fs')


app.use(express.static(path.join(__dirname, './project')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/project/index.html');
});
app.post('/writefile', (req, res) => {
   
        try {
            fs.writeFileSync("favorites.txt", JSON.stringify(req.body))
            res.json("Saved");
        } catch (err) {
            res.json(err)
        }
    
})
app.get('/getapi', (req, res) => {

    https.get('https://www.sbir.gov/api/solicitations.json?keyword=sbir', (resp) => {
        let data = '';
         
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                res.json(JSON.parse(data));
               
                
            });

            }).on("error", (err) => {
            console.log("Error API ");
        });

});

server.listen(8000, () => {
    console.log(`Server started: http://localhost:8000`)
})