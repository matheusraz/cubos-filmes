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

isFloat = (n) => {
    return (n / 5) % Math.round(n / 5) !== 0;
}

convertPage = (total_pages) => {
    let partes = {}
    for(i = 1; i <= 4; ++i) {
        if(i == 1) {
            partes[i] = {inicio: 1, fim: 5}
        } else if(i == 2) {
            partes[i] = {inicio: 6, fim: 10}
        } else if(i == 3) {
            partes[i] = {inicio: 11, fim: 15}
        } else if(i == 4) {
            partes[i] = {inicio: 16, fim: 20}
        }
    }
    
    let inicio = 1;
    let fim = inicio + 4;
    let partePagina = 1
    let controle = 1;
    let totalReal = 1;
    let result = {}

    for(i = 1; i <= total_pages; ++i) {
        result[i] = {paginaReal: totalReal, parte: partePagina, range: partes[partePagina]};
        if(controle % 4 == 0) {
            totalReal += 1;
            partePagina = 1;
            controle += 1;
        } else {
            controle += 1;
            partePagina += 1;
        }
    }

    return result;
}

router.get("/", (req, res) => {
    res.json(responseMessage(['status', 'msg'],['1', 'Estou de pé!']));
});

router.get("/buscaFilme", (req, res) => {

    let movie = req.headers.movie;
    let page = req.headers.page;
    let total_pages = req.headers.totalpages;

    let realPage = 1;
    let pagePartition;

    if(total_pages !== undefined) {
        let mapaPages = convertPage(total_pages);
        pagePartition = mapaPages[page];
        realPage = pagePartition.paginaReal;
    }

    https_options = {
        'host': `api.themoviedb.org`,
        'path': `/3/search/movie?api_key=${api_key}&language=pt-BR&page=${realPage}&query=${movie}`,
        'method': 'GET',
        'headers': {}
    }

    let request = https.request(https_options, (response) => {

        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        })

        response.on('end', () => {
            response = JSON.parse(data);
            let obj;
            let totalPages = response.total_results / 5;
            if(isFloat(totalPages)){
                totalPages = Math.round(totalPages) + 1;
            }
            if(pagePartition === undefined) {
                obj = {
                    total_pages: totalPages,
                    items: response.results.slice(0, 5)
                }
            } else {
                try {
                    obj = {
                        total_pages: totalPages,
                        items: response.results.slice(pagePartition.range.inicio-1, pagePartition.range.fim)
                    }
                } catch (err) {
                    obj = {
                        total_pages: totalPages,
                        items: response.results.slice(pagePartition.range.inicio-1, response.results.length)
                    }
                }
            }
            res.json(responseMessage(['status', 'msg'], ['1', obj]));
        })

        response.on('error', (err) => {
            res.json(err);
            console.log(err);
        })
    });

    request.write("");
    request.end();

});

router.get('/buscaGenero', (req, res) => {

    let generoId = req.headers.idgenero;
    let page = req.headers.page;
    let total_pages = req.headers.totalpages;

    let realPage = 1;
    let pagePartition;

    if(total_pages !== undefined) {
        let mapaPages = convertPage(total_pages);
        pagePartition = mapaPages[page];
        realPage = pagePartition.paginaReal;
    }

    https_options = {
        'host': `api.themoviedb.org`,
        'path': `/3/discover/movie?api_key=${api_key}&language=pt-BR&&page=1&with_genres=${generoId}&page=${realPage}`,
        'method': 'GET',
        'headers': {}
    }

    let request = https.request(https_options, (response) => {
        let data = "";

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            response = JSON.parse(data);
            let obj;
            let totalPages = Math.ceil(response.total_results / 5);
            if(pagePartition === undefined) {
                obj = {
                    total_pages: totalPages,
                    items: response.results.slice(0, 5)
                }
            } else {
                try {
                    obj = {
                        total_pages: totalPages,
                        items: response.results.slice(pagePartition.range.inicio-1, pagePartition.range.fim)
                    }
                } catch (err) {
                    obj = {
                        total_pages: totalPages,
                        items: response.results.slice(pagePartition.range.inicio-1, response.results.length)
                    }
                }
            }
            res.json(responseMessage(['status', 'msg'], ['1', obj]));
        })
    })

    request.write("");
    request.end();
    
});

router.get('/generos', (req, res) => {

    https_options = {
        'host': `api.themoviedb.org`,
        'path': `/3/genre/movie/list?api_key=${api_key}&language=pt-BR`,
        'method': 'GET',
        'headers': {}
    }

    let request = https.request(https_options, (response) => {

        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        })

        response.on('end', () => {
            response = JSON.parse(data);
            res.json(responseMessage(['status', 'msg'], ['1', response.genres]));
        })

        response.on('error', (err) => {
            res.json(responseMessage(['status', 'msg'], ['0', err]));
            console.log(err);
        })
    });

    request.write("");
    request.end();

});

module.exports = router;