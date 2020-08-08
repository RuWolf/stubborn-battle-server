const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Record = require('../models/maxcount');

router.post('/init', async (req, res) => {

  const testRecord = req.query.testRecord || 0

  /* const testRecord = Record.findOne({})
  console.log(testRecord)  */
  Record.updateOne(
    {}, 
    { $set: {count: testRecord}},
    () => {
      mongoose.disconnect(); 
  }
  );

  /* Record.findOneAndUpdate(
    {}, // критерий выборки
    { $set: {count: 25}}, // параметр обновления
    function(err, result){
         
        console.log(result);
        client.close();
    }
  ); */
  /* const record = new Record({
    count: 41
  });*/
  
  /* record.save(function(err){
    if(err) return console.log(err);
    console.log("Сохранен объект", record);
    mongoose.disconnect(); 
  }) */
  res.json({result: testRecord})
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