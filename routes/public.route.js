let mongoose = require("mongoose"),
express = require("express");
router = express.Router();
const config = require("../config/config.js");
nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: config.MAIL,
    pass: config.PASSWORD,
  },
});
let storeSchema = require("../models/Stores");
let productSchema = require("../models/Products");
router.route("/").get((req, res) => {
  const query = { Delete: { $nin: true } };
  storeSchema.find(query, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/products").get((req, res) => {
  const query = { Delete: { $nin: true } };
  productSchema.find(query, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/six-stores").get((req, res) => {
  const query = { Delete: { $nin: true } };
  storeSchema
    .find(query, (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
      }
    })
    .limit(6)
    .sort({ $natural: -1 });
});
router.route("/enviar-email").post((req, res, next) => {
  let mail = req.body
  let de = mail.Nombre.toLowerCase().replace(/\s+/g, "");
  let mailOptions = {
    from: `${mail.Nombre} - Colombia Emprende`,
    to: mail.Email,
    subject: mail.Subject,
    text: mail.Msj,
    html: mail.Html
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
  });
})
module.exports = router;
