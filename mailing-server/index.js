const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
const transproter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "araizzahid45@gmail.com",
    pass: process.env.PASS,
  },
});
const handlerBarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};
transproter.use("compile", hbs(handlerBarOptions));

const mailOptions = {
  from: "araizzahid45@gmail.com",
  to: "sepacen413@ebuthor.com",
  subject: "Sending Email",
  attachments: {
    filename: "bg.jpg",
    path: __dirname + "/public/images/bg.jpg",
    cid: "imagename",
  },
  template: "email",
  context: {
    title: "Human Resourse",
    text: "Lorem lskdjfljs;sdjfjfkjdsk",
  },
};

app.get("/", (req, res) => {
  mailOptions.to = "sepacen413@ebuthor.com";
  mailOptions.subject = "Sending Email";
  mailOptions.template = "email";
  mailOptions.context = {
    title: "Human Resoures",
    text: "loream33dlkfjsdlkf;sdlkfjsldkjf;lsdjfk",
  };
  transproter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email send" + info.response);
      res.json({ message: "Email has been send" + info.response });
    }
  });
});

app.post("/", (req, res) => {
  const { name, email } = req.body;
  mailOptions.to = email;
  mailOptions.subject = "Welcome Email";
  mailOptions.template = "welcome";
  mailOptions.context = {
    name,
    email,
  };
  transproter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("email send" + info.response);
      res.json({ message: "Email has been send" + info.response });
    }
  });
});

app.listen(5000, () => {
  console.log("Server has been started at http://localhost:5000");
});
