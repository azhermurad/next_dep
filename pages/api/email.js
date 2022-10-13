import nodemailer from 'nodemailer'

export default async (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: 'abcinvoice2022@gmail.com',
      pass: 'qutt buhb waln pqje',
    },
    secure: true,
  })

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});
  const mailOptions = {
    from: 'abcinvoice2022@gmail.com',
    to: req.body.emailTo,
    subject: `Your Project INC Registration Link`,
    text: `
Hi,

Please proceed to https://sp-inc-student-application-ccna.vercel.app/form/${req.body.nano_id_url} to complete your registration details.
Thank you for signing up!
`,
  }

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log('Email sent: ' + info.response)
  //   }
  // })
  // res.status(200).send('Email successfully sent')
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        console.log(info)
        resolve(info)
      }
    })
  })

  res.status(200).send('Email successfully sent')
}
