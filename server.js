var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {

    url = 'https://act.myngp.com/Forms/NoScript/-8618499235200825344';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var json = {
                version: '',
                formId: '',
                tenantName: '',
                formType: ''
            };

            $('form').filter(function() {

                
                
            });
        }
    });

});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;