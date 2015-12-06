# ngp-form-scraper
Scrapes NGP forms to provide everything you need to create custom forms

NGP recently changed their API and made it much harder to scrape their forms to create your own custom forms with the html structure of your choosing. Key hidden inputs are no longer easy to find in the form hosted by NGP or rendered by the NGP Action Tag. This app will get around that for all forms except Donation forms.

NGP Form Scraper is created in AngularJS with a Node/Express backend. The form scraping comes to you courtesy of <a href="https://github.com/cheeriojs/cheerio" target="_blank">Cheerio</a>, which is server-side implementation of jQuery.

NGP Form Scraper is now live at <a href="http://stuartdotson.com/ngp-form-scraper" taret="_blank">http://stuartdotson.com/ngp-form-scraper</a>.
