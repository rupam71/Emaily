const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const { fileURLToPath } = require('url')
require('./models/User')
require('./services/passport')
// const authRoutes = require('./routes/authRoutes')

mongoose.connect(process.env.mongoURI, {useNewUrlParser: true,  useCreateIndex : true, useUnifiedTopology: true});

const app = express()   


app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 *24*60*60*1000,   //milisecond
        keys: [process.env.cookieKey]
    })
)


 app.use(passport.initialize())
 app.use(passport.session())

// authRoutes(app)
require('./routes/authRoutes')(app)
require('./routes/billingRouter')(app)


if(process.env.NODE_ENV === 'production') {
    // express will serve up production assests
    // like our main.js or main.css file
    app.use(express.static('client/build'))


    // Express will serve up the indexe.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log(`Listening at port : ${PORT}`)