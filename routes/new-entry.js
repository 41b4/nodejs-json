var express = require('express');
const { route } = require('.');
var router = express.Router();

/* render*/
router.get('/', function(req, res, next) {
  res.render('newentry')
  
});

/* FORM */
router.post('/',(req, res, next)=>{
  //
  const {title, author, image, description}= req.body
  console.log({title, author, image, description})
  res.redirect('/new-entry')
})
module.exports = router;
