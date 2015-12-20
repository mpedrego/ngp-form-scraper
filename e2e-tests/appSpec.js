/*beforeEach(function() {
  browser.get('http://127.0.0.1:3000/');
});*/

describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://127.0.0.1:8081/');

    expect(browser.getTitle()).toEqual('NGP Form Scraper');
  });
});