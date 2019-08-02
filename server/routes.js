const express = require('express');
const https = require('https');
const router = express.Router();
const api_key = '7468fa144f6fcdeda3097c41ec1caa15';

responseMessage = (keys, values) => {
    try {
        let response = {};
        for(let i = 0; i < keys.length; ++i) {
            let key = keys[i];
            response[key] = values[i];
        }
        return response;
    } catch (err) {
        console.log(err.stack);
    }
}

router.get("/", (req, res) => {
    res.json(responseMessage(['status','msg'],['1','Estou de pé!']));
});

router.get("/teste", (req, res) => {

    let movie_id = 550;

    https_options = {
        // 'host': "api.themoviedb.org/3/",
        'host': `api.themoviedb.org`,
        'path': `/3/movie/${movie_id}?api_key=${api_key}`,
        'method': 'GET',
        'headers': {}
    }

    let request = https.get(https_options, (response) => {

        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        })

        response.on('end', () => {
            response = JSON.parse(data);
            res.json(response);
        })

        response.on('error', (err) => {
            res.json(err);
            console.log(err);
        })
    });


});

module.exports = router;