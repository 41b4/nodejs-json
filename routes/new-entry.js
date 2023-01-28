var express = require('express');
const fs = require('fs')
var router = express.Router();

/* render*/
router.get('/', function(req, res, next) {
  res.render('newentry')
  
});

/* FORM */
router.post('/',(req, res, next)=>{
  //get id copy json
  const response = fs.readFileSync('info.json', 'utf8', (error, result) => {
    if(error){
       console.log(error);
       return;
    }
      return result 
  })
  const out=JSON.parse(response)
  
  let id=out.data.length+1
  if(id<10){
    id=0+String(id)
  }
  //write json
  const obj={
    id: id,
    title: req.body.title,
    image:req.body.image,
    author: req.body.author,
    description: req.body.description
  }
  out.data.push(obj)
  const insert =JSON.stringify(out)
  console.log(insert)

  fs.writeFileSync('info.json',insert,'utf8', (error, result) =>{
    if (error){
      console.log(error)
    }else{
      console.log(result)
    }
  })
  
  res.redirect('/new-entry')
})
module.exports = router;
