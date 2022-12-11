const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");//https get module

const app = express();

app.use(express.static("public"))//this line will tell the the system that all files regarding css images are present in public folder without this line javascript will not know where is css files
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){

    res.sendFile(__dirname + "/signup.html")

})

app.post('/',function(req,res){

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    var data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]


    }//javascript object to send the user details to mailchimp

    const jsonData = JSON.stringify(data);//converting to json flatpack data
    const url = "https://us21.api.mailchimp.com/3.0/lists/e8e46a7f66";//list id
    const options = {
        method: "POST",
        auth: "anshumaantiwari123@gmail.com:c1d6097d4a3b708cef8617aafc6641dd-us21"
    }

    const request = https.request(url, options, function(response){//to make http post request

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));//converting hexadecimal response to json
        });
    });

    request.write(jsonData);//posting json data using http post method
    request.end();
});


app.post('/success',function(req,res){
  res.redirect("/");//redirecting to '/' route
})

app.post('/failure',function(req,res){
  res.redirect("/");//redirecting to '/' route
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})

// apikey c1d6097d4a3b708cef8617aafc6641dd-us21
//list id e8e46a7f66
