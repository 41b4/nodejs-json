var express = require('express');
const fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  const response = fs.readFileSync('info.json', 'utf8', (error, result) => {
    if(error){
       console.log(error);
       return;
    }
      return result 
  })
  const out=JSON.parse(response)
  res.render('index',{
    info: out.data});
});



module.exports = router;
