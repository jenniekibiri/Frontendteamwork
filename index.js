const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const path = require('path');
const router = express.Router();
const bodyparser = require('body-parser');
const {Client} = require('pg');

const env = process.env.DATABASE_URL
const connectionString = ' env || postgresql://postgres:5463jeny@localhost:5432/teamwork';
const client = new Client({
    connectionString: connectionString
});
client.connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('login')
});

app.get('/feeds', (req, res) => {

    let sql = 'select * from articles inner join account on articles.author_id=account.user_id ORDER BY created_on';
    client.query(sql, (err, result) => {


        if (err) throw err;
        res.render('feeds', {
            title: 'how to deal with programming burnouts',
            articles: result.rows


        })
    });
   

});



app.get('/signup', (req, res) => {
    res.render('signup')
});





app.get('/draft', (req, res) => {
    res.render('draft')
});


app.get('/comments', (req, res) => {
   

    client.query(`insert into account () values('${username}','${email}','${jobrole}','${password}','${department}')`, (err, result) => {
        if (err) {

            console.log(err);

        } else {

            res.redirect('/feeds')
        }
    })
});


app.post('/articles', (req, res) => {
    var userid = req.body.userid;
    var title = req.body.title;
    var category = req.body.category;
    var article = req.body.article;
    var dateCreated = new Date();
    var dd = dateCreated.getDate()
    var mm = dateCreated.getMonth() + 1

    var yyyy = dateCreated.getFullYear()
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    dateCreated = yyyy + mm + dd
  
    client.query(`insert into articles (author_id,article_title,category,article,created_on) values('${userid}','${title}','${category}','${article}','${dateCreated}')`, (err, result) => {
        if (err) {

            console.log(err);

        } else {

            res.redirect('/feeds')
        }
    })

})

app.post('/login', (req, res) => {
    var password = req.body.password;
    var username = req.body.username;
    var email = req.body.username;


    if (username && password) {
        client.query(`select * from account where username = '${req.body.username}' OR email ='${req.body.username}' AND  password = '${req.body.password}'`, (err, result) => {
            const rows = result.rows;

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

        } else {

            res.redirect('/')
        }
    })
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))