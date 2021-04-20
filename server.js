const express = require ('express');
const path = require ('path');
const fs = require ('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (error, data) =>{
        if (error) {
            throw error;
        }
        console.log(data)
        let parseData = JSON.parse(data);
        return res.json(parseData);
    })
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (error, data) =>{
        if (error) {
            throw error;
        }
        let parseData = JSON.parse(data);
        console.log(req.body);
        
        req.body.id = Date.now();

        parseData.push(req.body);

        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(parseData), (error)=> {
            if (error) {
                throw error;
            }
            return res.json(parseData);
        })
    });
});


app.listen(port, () => console.log(`App Is Working! ${ port }`));