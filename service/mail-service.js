const nodemailer  = require('nodemailer');

/**
 * Role: The project require the feautres that admin can send the email to the customers after they contacted.
 * Package: nodemailer
 */
const MailService = {
    /**
     * 
     * Role:  setup the configuration for mailserver, and send the email to the receiver.
     */
    send(param){
        var transporter = nodemailer.createTransport({
            host: param.host,
            service: param.service,
            port: param.port,
            secure: param.secure,
            auth: {
               user: param.user,
               pass: param.pass
            }
        });

        var mailOptions = {
            from: param.from,
            cc: param.cc,
            to: param.to,
            subject: param.subject,
            text: param.text,
            html: param.html,
            attachments: [
                {
                  filename: param.filename,
                  path: param.path,
                  content: param.content
                }
            ]           
        };  

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });              
    }
};


module.exports = MailService;