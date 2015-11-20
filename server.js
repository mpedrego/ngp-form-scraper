var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var environment = process.env.NODE_ENV;

    app.use('/', express.static('./src/index.html'));
    app.use(express.static('./src/'));


app.get('/api', function(req, res) {

    var url = req.query.url ? req.query.url : 'https://act.myngp.com/Forms/NoScript/-8618499235200825344';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var json = {
                version: '',
                formId: '',
                tenantName: '',
                formType: '',
                fields: []
            };

            json.version =  $('#Version').val();
            json.formId =  $('#id').val();
            json.tenantName =  $('#TenantName').val();
            json.formType =  $('#formType').val();
            


            var fields = $('form').serializeArray();

            var newFields = fields.map(function(field) {
                var thisType = $('[name="' + field.name + '"]').attr('type');
                field.type = thisType;
                return field;
            });

            json.fields = newFields;

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            res.send(json);

        }
    });

});



app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;