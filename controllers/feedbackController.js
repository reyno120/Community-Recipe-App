const nodemailer = require('nodemailer');
const { emailPassword, myEmail } = require('../config/keys');
const Feedback = require('../models/Feedback');

module.exports = (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true
,       auth: {
            user: 'communityrecipeapp@gmail.com',
            pass: emailPassword
        }
    });

    let mailOptions = {
        from: 'communityrecipeapp@gmail.com',
        to: myEmail,
        subject: 'Feedback on Community Recipe App',
        text: 'Bugs/Errors: ' + req.body.bugs + '\n' + 
              'Features Liked: ' + req.body.featuresLiked + '\n' +
              'Features Missing: ' + req.body.featuresMissing + '\n' + 
              'Improvements: ' + req.body.improvements + '\n' +
              'Other: ' + req.body.other 
    }


    Feedback.create({
        bugs: req.body.bugs,
        featuresLiked: req.body.featuresLiked,
        featuresMissing: req.body.featuresMissing,
        improvements: req.body.improvements,
        other: req.body.other
    },
    (error, feedback) => {
        if(error) {
            console.log(error);
        }
        else {
            transporter.sendMail(mailOptions, (error, data) => {
                if(error) {
                    console.log(error);
                }
                else {
                    res.send();
                }
            });
        }
    });

}