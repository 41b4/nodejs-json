var express = require('express');
const fs = require('fs')
var router = express.Router();

/* render*/
router.get('/', function(req, res, next) {
  res.render('newentry')
  
});

/* FORM */
router.post('/',(req, res, next)=>{
  //copy json
  const response = fs.readFileSync('info.json', 'utf8', (error, result) => {
    if(error){
       console.log(error);
       return;
    }
      return result 
  })
  const out=JSON.parse(response)
  
  //write json
  const array=[]
  for (let i=0; i<out.data.length; i++){
    if(i<10){
      const obj={
        id: '0'+String(i),
        title: out.data[i].title,
        image: out.data[i].image,
        author: out.data[i].author,
        description: out.data[i].description
      }
      array.push(obj)
    }else{
      const obj={
        id: i,
        title: out.data[i].title,
        image: out.data[i].image,
        author: out.data[i].author,
        description: out.data[i].description
      }
      array.push(obj)
    }
    
  }
  if (array.length<10){
      const newobj={
        id: '0'+String(array.length),
        title: req.body.title,
        image:req.body.image,
        author: req.body.author,
        description: req.body.description
    }
    array.push(newobj)
  }else{
    const newobj={
      id: array.length,
      title: req.body.title,
      image:req.body.image,
      author: req.body.author,
      description: req.body.description
    }
    array.push(newobj)
  }
 
  const form={}
  form['data']=array
  //console.log(form)

  const insert =JSON.stringify(form)
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
