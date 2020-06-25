var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// require(String)(stripe secret key)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req,res)=> {
       // console.log(req.body)

    //    if(!req.user) {
    //        return res.status(401).send({
    //            error: 'You Must Log in'
    //        })
    //    }
// no need, we already make niddleware


       // real cradit card we need to make
       const charge = await stripe.charges.create({
           amount: 500, // cent in $
           currency: 'usd',
           description: '$5 for 5 credits',
           source: req.body.id
       })
     //  console.log(charge)

       req.user.credits += 5;
       const user = req.user.save();

       res.send(user)
    })
}