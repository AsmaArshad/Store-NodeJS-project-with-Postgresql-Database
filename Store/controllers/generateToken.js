var jwt = require('jsonwebtoken');

exports.getToken = async (privateKey, x_api_key) => {
    try {
        let timestamp = Math.floor(+new Date() / 1000);
        let token = await jwt.sign({
            "sub": "shoalter",
            "name": "shoalter",
            "iat": timestamp,
            "x-api-key": x_api_key
        }, privateKey, { algorithm: 'RS256' });
       // console.log(token);
        return token;
    } catch {
        console.log('Token Error', err.message);
    }
}