const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Record = require('../models/maxcount');

router.post('/init', async (req, res) => {

  const idRecord = '5f2f2530d6dc6d6d668bd141'

  let testRecord = parseInt(req.query.testRecord, 10) || 0

   Record.findOne({_id: idRecord}, async (err, docs) => {
    //await mongoose.disconnect();
   
    if(err) return console.log(err)

    if (testRecord > docs.count) {
      Record.updateOne(
        {_id: idRecord}, 
        { $set: {count: testRecord}},
        () => {
          mongoose.disconnect(); 
        }
      );
      res.json({record: testRecord})
    } else {
      res.json({record: docs.count})
    }
  }) 
});

router.post('/max', async (req, res) => {
  const count = req.body.count || 0;

  const newMaxCount = new Max({maxCount: count});

  try {
    await newMaxCount.save();
    res.json('saved')
  } catch {
    res.json('no saved')
  }
});



router.post('/request', async (req, res) => {
  const {cuid, text} = req.body;
  const response = await fetch("https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      'cuid': cuid,
      'text': text
    })
  });
  let result = await response.json();
  res.json({response:result.result.text.value});
});

module.exports = router;