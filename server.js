var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var environment = process.env.NODE_ENV;


app.use('/', express.static('./src/index.html'));
app.use(express.static('./src/'));


app.get('/api', function(req, res) {

    /* url format is https://act.myngp.com/Forms/NoScript/-8618499235200825344 */

    var formId = req.query.formId ? req.query.formId : '-8618499235200825344',
        formUrl = 'https://act.myngp.com/Forms/NoScript/' + formId;

    request(formUrl, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var fields = $('form').serializeArray();

            var newFields = fields.map(function(field) {
                var $thisSelector = $('[name="' + field.name + '"]');
                    thisType = $thisSelector.attr('type'),
                    thisTag = $thisSelector[0].name;


                field.type = thisType;
                field.tag = thisTag;

                if (thisTag === 'select' ) {
                    field.options = [];

                    $thisSelector.children().each(function(i, el) {
                        if (el.attribs.value !== '') {
                            field.options.push(el.attribs.value);
                        }
                    });
                }

                return field;
            });

            json = newFields;

            // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
            res.send(json);

        }
    });

});



app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;