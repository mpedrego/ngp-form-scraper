beforeEach(function() {
  browser.get('http://127.0.0.1:8081/');
});

describe('NGP Form Scraper App', function() {
  
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('NGP Form Scraper');
  });

  it('should bring up ajax loader on submit', function() {
    element(by.id('basic-url')).sendKeys('7944614294361016320\n');
    expect(element(by.id('results')).isDisplayed()).toBe(true);
  });

});