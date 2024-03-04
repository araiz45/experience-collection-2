export default function transporterFunction(mailOptions) {
  transproter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email send" + info.response);
      res.json({ message: "Email has been send" + info.response });
    }
  });
}
