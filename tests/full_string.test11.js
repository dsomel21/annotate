//Unit Testing with Selenium and Jest
/**
 * @jest-environment jest-environment-webdriver
 * 
 * Visit jest documentation at: https://jestjs.io/docs/api
 */

 const {By, Builder, until} = require("selenium-webdriver");
 require("chromedriver");
  
 const url = 'http://localhost:3000/'   // This url needs to be changed to the website
 var page = '';
 const test_username = 'user';
 const test_password = 'pass';

 // We use this to make sure the page is loaded befor trying to get the elements
 const documentInitialised = () =>
    driver.executeScript('return document.readyState');

 jest.setTimeout(30000); // Jest normally times out due to some asynchronous leakages. This is used to delay the timeouts
 var driver;

// This runs before all the tests
 beforeAll( async () => {
     // Here is where we load the browser. 
    // You can change it to firefox. Other browsers are supported although slight issues may occur
    driver = await new Builder().forBrowser("chrome").build(); 
    // await driver.manage().window().setRect({ width: 1024, height: 768 });
    await driver.manage().window().setRect({ width: 1600, height: 768 });
    // await new Promise((r) => setTimeout(r, 10000));
});

// This runs after all the tests are run
afterAll(async () => {
    // await driver.quit(); // Closes the browser
  }, 15000);

// This is used to group related tests together.
// Only one describe is used here but as the project becomes bigger, it may be necessary to ...
// group them into different describe blocks
describe('This should highlight full line.', () => {
    // This is a single test
    it('Should open the annotate url', async () => {
        // const res = await driver.get('https://developer.mozilla.org');
        const res = await driver.get(url);
        await new Promise((r) => setTimeout(r, 2000));
        page = 'MainPage';
        // await driver.executeScript("monitorEvents($0, 'mouse')");
    } )

    describe("This should test FULL_STRING", () => {
        let myArr;
        let full_string;
        let data;
        beforeAll(async () => {
            const line_elements = await driver.findElements(By.css('.FULL_STRING p'));
            const line_element  = line_elements[0];
            const line_element1  = line_elements[1];

            console.log(line_element);
            full_string = await line_element.getText();

            console.log("full_string: ", full_string);

            let sourceEle = line_element;
            let targetEle = line_element1;

            await driver.executeScript("arguments[0].scrollIntoView(true);", line_element);

            let offset = await targetEle.getRect();
            let x = await offset.x;
            let y = await offset.y;
            const actions = driver.actions({async: true});

            await actions.move({origin:sourceEle}).press().perform();
            await actions.move({origin:targetEle}).release().pause(3000).perform();

            await driver.executeScript("console.log(4837473);");
            data = await driver.executeScript("return window.getSelection().toString();");
            myArr = data.split(" ");
        })
        it('Should confirm that only one line was grabbed', async () => {
            
            expect(myArr.length).toBeGreaterThan(0);

            console.log(myArr);
            
            for(let e of myArr) {
                // Notice that if the next line is grabbed, this will fail. "full_string" is first line and it does not contain words in the second line
                expect(full_string).toContain(e); 
            }
        } )

        it('Should confirm that the full line was grabbed', async () => {
            
            expect(myArr.length).toBeGreaterThan(0);

            console.log(myArr);
            
            expect(data).toEqual(full_string);
        } )
    });
})