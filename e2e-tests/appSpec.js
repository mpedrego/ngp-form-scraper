
describe('NGP Form Scraper App', function() {
    beforeEach(function() {
      browser.get('http://127.0.0.1:3000/');
    });
  
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('NGP Form Scraper');
  });

  it('should show results div and hide form on submit', function() {
    element(by.id('basic-url')).sendKeys("7944614294361016320\n");
    expect(element(by.id('results')).isDisplayed()).toBe(true);
    expect(element(by.css('form')).isDisplayed()).toBe(false);
  });

  it('should show results if formID exists', function() {
    element(by.id('basic-url')).sendKeys('7944614294361016320\n');
    expect(element(by.css('.alert-success')).isDisplayed()).toBe(true);
    expect(element(by.css('.alert-danger')).isDisplayed()).toBe(false);

    expect(element(by.css('.results-html')).isDisplayed()).toBe(true);
    expect(element(by.css('table')).isDisplayed()).toBe(false);

    element.all(by.css('button')).get(1).click(); // click table button
    expect(element(by.css('table')).isDisplayed()).toBe(true);
    expect(element(by.css('.results-html')).isDisplayed()).toBe(false);

    element.all(by.css('button')).get(0).click(); // click html button
    expect(element(by.css('table')).isDisplayed()).toBe(false);
    expect(element(by.css('.results-html')).isDisplayed()).toBe(true);
  });

  it('should show error message if formID does not exist', function() {
    element(by.id('basic-url')).sendKeys('123412341234\n');
    expect(element(by.css('.alert-success')).isDisplayed()).toBe(false);
    expect(element(by.css('.alert-danger')).isDisplayed()).toBe(true);

    element(by.css('.btn-danger')).click();
    expect(element(by.id('results')).isDisplayed()).toBe(false);
    expect(element(by.css('form')).isDisplayed()).toBe(true);
  });

});