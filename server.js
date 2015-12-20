var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var environment = process.env.NODE_ENV;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use('/', express.static('./src/index.html'));
app.use(express.static('./src/'));


app.get('/api', function(req, res) {

    /* url format is https://act.myngp.com/Forms/NoScript/-8618499235200825344 */

    var formId = req.query.formId,
        formUrl = 'https://act.myngp.com/Forms/NoScript/' + formId;

    request(formUrl, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var fields = $('form').serializeArray();

            if (fields.length === 0) {
                res.status(400).json({ error: 'NGP form not found.' })
            } else {
                var newFields = fields.map(function(field) {
                    var $thisSelector = $('[name="' + field.name + '"]');
                        thisType = $thisSelector.attr('type'),
                        thisTag = $thisSelector[0].name;


                    field.type = thisType;
                    field.tag = thisTag;

                    if (thisTag === 'select' ) {
                        field.options = [];
                        field.type = 'select';

                        $thisSelector.children().each(function(i, el) {
                            if (el.attribs.value !== '') {
                                field.options.push(el.attribs.value);
                            }
                        });
                    }

                    return field;
                });

                json = newFields;
                res.send(json);
            }



        }
    });

});



app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;