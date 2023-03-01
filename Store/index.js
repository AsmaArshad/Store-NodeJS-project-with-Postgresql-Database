var jwt = require('jsonwebtoken');
var fs = require('fs');
var axios = require('axios');
let path = require('path')


let timestamp = Math.floor(+new Date() / 1000)


let filepath = path.join(__filename,"../H8347003_private_key.pem")

var privateKey = fs.readFileSync(filepath);

let x_api_key = "fcfc53ee-74ce-40f1-9c89-5cf92f389651"

let storeCode = "H8347003"


async function getToken() {

    let token = jwt.sign({
        "sub": "shoalter",
        "name": "shoalter",
        "iat": timestamp,
        "x-api-key": x_api_key
    }, privateKey, { algorithm: 'RS256' });


    return token
}

async function getProduct() {


   
    let token =  await getToken()

    var config = {
        method: 'get',
        url: 'https://mms-api.shoalter.com/mmsAdmin/oapi/api/store/details',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'storeCode': storeCode,
            'platformCode': 'HKTV',
            'businessType': 'eCommerce'
        }
    };

   await axios(config)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getProduct()
