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

            console.log(newFields)

            json.fields = newFields;

            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

                console.log('File successfully written! - Check your project directory for the output.json file');

            });

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            res.send(json);

        }
    });

});



app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;