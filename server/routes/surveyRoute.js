const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredit')
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplate/surveyTemplates')
const _ = require('lodash')
const { Path } = require('path-parser');
const { URL } = require('url')

module.exports = app => {
    app.get('/api/surveys/thanks', (req,res)=> {
        res.send('Thanks for voting!')
    })

    // app.post('/api/surveys/webhooks', (req,res)=>{
    //   console.log(req.body);
    //   const p = new Path('/api/surveys/:surveyId/:choice')

    //     const events = _.map(req.body, (event)=>{
    //       const pathname = new URL(event.url).pathname
    //       const match = p.test(pathname)

    //       if(match) {
    //         return {
    //           email: event.email,
    //           surveyId: match.surveyId,
    //           choice: match.choice
    //         }
    //       }
    //    })

    //    console.log(events)
    //    const compactEvent = _.compact(events);
    //    const uniqueEvents = _.unionBy(compactEvent, 'email', 'surveyId');
    //     console.log(uniqueEvents)
    //   })


    app.post('/api/surveys/webhooks', (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice');
  
      _.chain(req.body)
        .map(({ email, url }) => {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice };
          }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false }
              }
            },
            {
              $inc: { [choice]: 1 },
              $set: { 'recipients.$.responded': true },
              lastResponded: new Date()
            }
          ).exec();
        })
        .value();
  
      res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
      const { title, subject, body, recipients } = req.body;
  
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
      });
  
      // Great place to send an email!
      const mailer = new Mailer(survey, surveyTemplate(survey));
  
      try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
  
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    })
}