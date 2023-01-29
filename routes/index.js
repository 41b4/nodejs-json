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


/*DELETE*/

router.post('/',(req, res, next)=>{
  const deleteID=Number(req.body.id)
  const response = fs.readFileSync('info.json', 'utf8', (error, result) => {
    if(error){
       console.log(error);
       return;
    }
      return result 
  })
  const out=JSON.parse(response)
  const array=[]
  for (let i=0; i<out.data.length; i++){
    if(out.data[i].id==deleteID){
      continue
    }else{
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
  
  res.redirect('/')
})


module.exports = router;
