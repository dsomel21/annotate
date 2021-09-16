//Unit Testing with Selenium and Jest
/**
 * @jest-environment jest-environment-webdriver
 *
 * Visit jest documentation at: https://jestjs.io/docs/api
 */

const { By, Builder, until } = require('selenium-webdriver');
require('chromedriver');

const url = 'http://localhost/3000'; // This url needs to be changed to the website
var page = '';
const test_username = 'user';
const test_password = 'pass';

// We use this to make sure the page is loaded befor trying to get the elements
const documentInitialised = () => driver.executeScript('return document.readyState');

jest.setTimeout(30000); // Jest normally times out due to some asynchronous leakages. This is used to delay the timeouts
var driver;

// This runs before all the tests
beforeAll(async () => {
  // Here is where we load the browser.
  // You can change it to firefox. Other browsers are supported although slight issues may occur
  driver = await new Builder().forBrowser('chrome').build();
  // await new Promise((r) => setTimeout(r, 10000));
});

// This runs after all the tests are run
afterAll(async () => {
  await driver.quit(); // Closes the browser
}, 15000);

// This is used to group related tests together.
// Only one describe is used here but as the project becomes bigger, it may be necessary to ...
// group them into different describe blocks
describe('This should run basic tests on game.', () => {
  // This is a single test
  it('Should open the game url', async () => {
    // const res = await driver.get('https://developer.mozilla.org');
    const res = await driver.get(url);
    await new Promise(r => setTimeout(r, 2000));
    page = 'MainPage';
  });

  describe('it captures a screenshot of the current page on the browser', () => {
    it('snap a picture by taking the screenshot', async () => {
      //   await browser.takeScreenshot()
      await driver.takeScreenshot().then(function (image, err) {
        require('fs').writeFile(page + '.png', image, 'base64', function (err) {
          console.log(err);
        });
      });
    });
  });

  it('Should successfully go to the login page', async () => {
    const button = await driver.findElement(By.css('.loginbtn'));
    await button.click();
    page = 'LoginPage';
  });

  describe('it captures a screenshot of the current page on the browser', () => {
    it('snap a picture by taking the screenshot', async () => {
      //   await browser.takeScreenshot()
      await driver.takeScreenshot().then(function (image, err) {
        require('fs').writeFile(page + '.png', image, 'base64', function (err) {
          console.log(err);
        });
      });
    });
  });

  it('Should successfully login', async () => {
    driver.executeScript('return document.readyState');
    const username_input = await driver.findElement(By.name('username'));
    const password_input = await driver.findElement(By.name('password'));

    await driver.executeScript(
      "arguments[0].setAttribute('value', '" + test_username + "')",
      username_input
    );
    await driver.executeScript(
      "arguments[0].setAttribute('value', '" + test_password + "')",
      password_input
    );

    const button = await driver.findElement(By.name('loginuser'));
    await button.click();
    page = 'HomePage';
  });

  describe('it captures a screenshot of the current page on the browser', () => {
    it('snap a picture by taking the screenshot', async () => {
      //   await browser.takeScreenshot()
      await driver.takeScreenshot().then(function (image, err) {
        require('fs').writeFile(page + '.png', image, 'base64', function (err) {
          console.log(err);
        });
      });
    });
  });

  it('Should check for navigations', async () => {
    var failed = false;

    const buttons = await driver.findElements(By.css('button'));
    const gameNavs = [
      'Maths',
      'English',
      'Verbal Reasoning',
      'Non Verbal Reasoning',
      'Study Time',
    ];
    const resultTexts = [];
    for (let e of buttons) {
      resultTexts.push(await e.getText());
    }

    for (let e of gameNavs) {
      // console.log(e);
      expect(resultTexts).toContain(e); // Checks if the texts of the buttons are in the gameNavs defined above
    }
  });

  it('Should successfully click on the addition link.', async () => {
    const actions = driver.actions(); // Mouse actions can be performed with this

    const buttons = await driver.findElements(By.css('button')); // We use the normal css selectors to find the html elements.

    var found = false; // This is used to avoid continuously searching after an element has been found and clicked

    // console.log(dropdowns);
    // console.log(await getElementXpath(driver, "//html[1]/body[1]/div[1]") );
    count = 0;
    for (let e of buttons) {
      // We don't want to waste time in the for loop if we still have found what we're looking for
      if (found) {
        break;
      }

      // We simulate moving the mouse on top of the button Only after we hover over the button can we see the dropdown menu
      await actions.move({ duration: 1000, origin: e }).perform();
      var dropdown = await driver.findElement(By.css('.dropdown-menu'));

      // We use the dropdown to get the <a> elements under it and not all the <a> existing in the page. !! Important
      let aElem = await dropdown.findElements(By.css('a'));

      for (let ae of aElem) {
        var a_text = await ae.getText(); // Getting text

        // e is a button. we check if it is the Maths button.
        // a_text is the <a> link. We check if it is the addition
        if ((await e.getText()) == 'Maths' && a_text == 'Addition') {
          await ae.click(); // And then we click
          found = true;
          break;
        }
      }
    }

    const play_button = await driver.findElement(By.linkText('Play')); // Getting an element using its inner text

    expect(await play_button.getText()).toEqual('Play');
  });

  it('Should successfully click on play.', async () => {
    const actions = driver.actions({ bridge: true });
    const play_button = await driver.findElement(By.linkText('Play'));
    await play_button.click();

    page = 'GamePage';
  });

  describe('it captures a screenshot of the current page on the browser', () => {
    it('snap a picture by taking the screenshot', async () => {
      //   await browser.takeScreenshot()
      await driver.takeScreenshot().then(function (image, err) {
        require('fs').writeFile(page + '.png', image, 'base64', function (err) {
          console.log(err);
        });
      });
    });
  });

  it('Game page should have 4 choices.', async () => {
    // let ele = await driver.wait(until.elementLocated(By.css('choice-container')),10000);
    // const choice_container = await driver.findElement(By.css('.choice-container'));
    const choice_prefixes = await driver.findElements(By.css('.choice-prefix'));
    const choice_texts = await driver.findElements(By.css('.choice-text'));

    // console.log(choice_prefixes);
    expect(choice_prefixes.length).toEqual(4);
    expect(choice_texts.length).toEqual(4);
  });

  it('Should randomly answer all questions.', async () => {
    // let ele = await driver.wait(until.elementLocated(By.css('choice-container')),10000);
    // const choice_container = await driver.findElement(By.css('.choice-container'));
    const choices = ['A', 'B', 'C', 'D'];
    var choice_prefixes = await driver.findElements(By.css('.choice-prefix'));

    while (choice_prefixes.length > 0) {
      var ans_index = Math.floor(Math.random() * (4 - 1) + 1); // We randomly select an answer

      await choice_prefixes[ans_index].click();
      // We use this to slow down and wait for the questions to refresh. You can reduce or increase the value as you see fit.
      await new Promise(r => setTimeout(r, 1000));

      // choice_prefixes = await driver.wait(until.elementLocated(By.css('choice-prefix')),5000);
      choice_prefixes = await driver.findElements(By.css('.choice-prefix'));
    }

    await driver.wait(() => documentInitialised(), 10000);
    const end_elements = await driver.findElements(By.id('end'));
    expect(end_elements.length).toEqual(1); // We are expecting an element with end id
    expect(await end_elements[0].getText()).toContain('Play Again'); // We are expecting "Play Again" in the end id

    page = 'EndPage';
  });

  describe('it captures a screenshot of the current page on the browser', () => {
    it('snap a picture by taking the screenshot', async () => {
      //   await browser.takeScreenshot()
      await driver.takeScreenshot().then(function (image, err) {
        require('fs').writeFile(page + '.png', image, 'base64', function (err) {
          console.log(err);
        });
      });
    });
  });
});
