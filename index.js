const express = require('express');
const path = require('path');
const router = express.Router();
const bodyparser = require('body-parser');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:5463@localhost:5432/teamwork';
const client = new Client({
    connectionString: connectionString
});
client.connect();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});
app.get('/feeds', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/feeds.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
});
app.get('/drafts', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/drafts.html'));
});
app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/settings.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
});

app.get('/feeds', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/myarticles.html'))
})

app.post('/login', (req, res) => {
    var password = req.body.password;
    var username = req.body.username;
        if (username && password) {
        client.query(`select * from account where username = '${req.body.username}' AND  password = '${req.body.password}'`, (err, result) => {
            const rows = result.rows;
            console.log(result.rows)
            console.log(typeof result);
            console.log(rows.length)
            if (rows.length > 0) {
                res.redirect('/feeds')
            } else {
                res.send('invalid username and password');
            }

        });
    } else {
        res.send('enter credentials')
    }

})

app.post('/signup', (req, res) => {
    var user_id = '';
    var username = req.body.username;
    var email = req.body.email;
    var jobrole = req.body.jobrole;
    var password = req.body.password;
    var department = req.body.department;

    client.query(`insert into account (username,email,job_role,password,department) values('${username}','${email}','${jobrole}','${password}','${department}')`, (err, result) => {
        if (err) {

            console.log(err);

        }
        else {
           
            res.redirect('/')
        }
    })
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
