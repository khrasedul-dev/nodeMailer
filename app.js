const express = require('express')
const nodemailer = require('nodemailer')
const ejs = require('ejs')

const app = express()

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const mail = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth:{
        user: "rasedul.mac@gmail.com",
        pass: "Rps1234@"
    }
})


app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/',(req,res)=>{

    const {sub,body,name} = req.body

    console.log(req.body)

    const mailObj = {
        to: "mehedihasan47341@gmail.com",
        subject: `${sub}`,
        html:`<h1>Client Name is ${name}</h1><p> ${body} </p>`
    }

    mail.sendMail(mailObj,(err)=>{
        if (err) {
            console.log(err)
        } else {
           res.render('index')
        }
    })
})

const port = process.env.PORT || 5000
app.listen(port,(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log("Server start on port "+port)
    }
})
