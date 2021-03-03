const express = require('express');
const app = express();


const bodyparser= require('body-parser');
app.get('/',(req, res) => {
   res.send('Credit Card validation')

})

var isexpired=false;
var cardtype=" "
var isvalidcvv=false;

function validate(cardno,expiryyear,cvv){
    var mc=/^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
    var amex=/^3[47][0-9]{13}$/
    var visa=/^4[0-9]{12}(?:[0-9]{3})?$/
    var disc=/^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
    var maestro=/^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/
    cardno=String(cardno)
    if(cardno.match(mc))
        cardtype="Mastercard"
    else if(cardno.match(amex))
        cardtype="American Express"
    else if(cardno.match(visa))
        cardtype="Visa"
    else if(cardno.match(maestro))
        cardtype="Maestro"
    else if(cardno.match(disc))
        cardtype="Disc"
    else 
       cardtype="Invalid card type"
    var d= new Date()
    var yearnow=d.getFullYear()
    if(expiryyear<yearnow)
        isexpired=true
    cvv=String(cvv)
    cvvregex =/^[0-9]{3,4}$/
    if(cvv.match(cvvregex))
       isvalidcvv=true
    return cardtype+":"+" Expired "+isexpired+" CVV Valid?:"+isvalidcvv
}

app.get('/carddetails',(req,res)=>{
    var cardno=req.query.number
    var exyear=req.query.year
    var cvv=req.query.cvv
    console.log(cardno)
    console.log(exyear)
    console.log(cvv)
    validate(cardno,exyear,cvv)
    res.json({
        "cardtype":cardtype,
        "isexpired": isexpired,
        "isCVVvalid":isvalidcvv
    })
})


module.exports=validate
app.listen(5000);