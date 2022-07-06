const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https = require("https");
const { log } = require("console");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}))
app.get("/", function(req, res)
{
    res.sendFile(__dirname +"/index.html")
})
app.post("/" , function(req, res)
{
    const firstname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const data1={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstname,
                    LNAME:lname,
                }
            }
        ]
    };
    const jsondata=JSON.stringify(data1);
    const url="https://us14.api.mailchimp.com/3.0/lists/";
    const Options={
        method:"POST",


    }
    const request=https.request(url, Options,function(response)
    {
        if(response.statusCode== 200)
        {
            res.sendFile(__dirname+"/succes.html");
        }else{       
            req.sendFile(__dirname+"/failer.html");
        }
        // response.on("data", function(data)
        // {
        //         console.log(JSON.parse(data));
        // })
    })


    request.write(jsondata);
    request.end();
    

})

app.post("/failer", function(req,res)
{
    res.redirect("/");
})
app.listen(process.env.PORT||3000, function()

{
    console.log("server started at 3000");
})



