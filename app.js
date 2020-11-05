const express = require("express");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
const https = require("https");
const app = express();

// parse application/x-www-form-urlencoded
// app.use(bodyparser.urlencoded({extended:false}));

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    // res.send("Name" + req.body.fname + req.body.lname + " Email " + req.body.Email);

    var data = {
        members: [{
            email_address: req.body.Email,
            status: "subscribed",
            merge_fields: {
                FNAME: req.body.fname,
                LNAME: req.body.lname
            }
        }
        ]
    }

    const jsonData= JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/a434e9c5fa";
    const options =  {
        method: "POST",
        auth: "sammiddleton:22d7cfe37b6b76fee45c067a0ee8767b-us2"
    }
    const request=  https.request(url,options, function(response){


        if (response.statusCode=="200"){
            res.sendFile(__dirname + "/success.html");
        } else
        {
            res.sendFile(__dirname + "/failure.html");
           
        }

 
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", (req,res)=>{
    res.redirect("/")
})




app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000")
})




/* curl -X POST \
  '?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>' \
  -H 'authorization: Basic <USERNAME:PASSWORD>' \
  -d '{"members":[],"update_existing":false}' */


  //

//   