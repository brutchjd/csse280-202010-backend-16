const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const logger = require('morgan');
router.use(logger('dev'));


function handleError(err, res, msg) {
    err.message = `$(err.message) $(msg)`;
    err.status = res.statusCode;
    res.json(err);
}

router.route('/')
    .post((req, res) => {
        console.log("got send email");
        const htmlEmail = `
            <h2>Oracle Cars Contact</h2>
            <h3>Contact Details<h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Phone: ${req.body.phone}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Contact Message:<h3>
            <p>${req.body.message}<p>
        `

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'streamlineunited@gmail.com',
                pass: 'qWaBTJAB437X'
            }
        })

        let mailOptions = {
            from: 'streamlineunited@gmail.com',
            to: 'jdbrutcher@gmail.com',
            subject: `New Web Contact From: ${req.body.name}`,
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                handleError(err, res, "Failed to send email.");
            } else {
                console.log(info);
            }
        })
        res.json("success");
    });


module.exports = router;