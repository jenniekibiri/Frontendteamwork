const express = require('express');
const path = require('path');
const router = express.Router();
const bodyparser = require('body-parser');
const {Client} = require('pg');
const connectionString ='postgres://postgres:5463@localhost:5432/teamwork';
const client =new Client({
    connectionString:connectionString
});
client.connect();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.send('server test');

});
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/feeds',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/sidenav.html'));
});


app.post('/login',(req,res)=>{

  
    var password =req.body.password;
    var username = req.body.username;
    console.log(username)


    console.log(password);

    if(username && password){
        client.query(`select * from account where username = '${req.body.username}' AND  password = '${req.body.password}'`,(err,result)=>{
            const rows = result.rows;
            console.log(result.rows)
            console.log(typeof result);
           
     

            console.log(rows.length)
            if(rows.length > 0){
                res.redirect('/feeds')
            }else{
                res.send('invalid username and password');
              
            
            }

        });
        
       
    
  

         
     }else{
         res.send('enter credentials')
     }




       
 
})
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/signup.html'));
});


app.post('/signup',(req,res)=>{
    var user_id='';
 var username = req.body.username;
 var email = req.body.email;
 var jobrole = req.body.jobrole;
 var password = req.body.password;
 var department= req.body.department;
//   console.log(username);
//  console.log(email);
//  console.log(jobrole);
//  console.log(password);
//  console.log(department);
client.query(`insert into account (username,email,job_role,password,department) values('${username}','${email}','${jobrole}','${password}','${department}')`,(err,result)=>{
    if (err){

        console.log(err);
       
    } 
    else{
    //    res.json({'message':"data inserted successfully"})
       console.log(result.rows)
       res.redirect('/home')
    }
})


});
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))
