var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/reply", function (req, res, next) {
  console.log(req.body);
});
router.post("/recived", function (req, res, next) {
  console.log(req.body);
});

router.post("/message", async (req, res, next) => {
  console.log(req.body);
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
  
    const message = await client.messages.create({
        from: `whatsapp:+14155238886`,
        body: `${req.body.message}`,
        to: `whatsapp:${req.body.to}`,
      })
    console.log(message);  
    res.send("OK")
  } catch (error) {
    console.log(error);
  } 
  })
module.exports = router;
