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

// beforeEach( async () => {
//     // Here is where we load the browser. 
//    // You can change it to firefox. Other browsers are supported although slight issues may occur
// //    driver.navigate().refresh();
// });

// This runs after all the tests are run
afterAll(async () => {
    // await driver.quit(); // Closes the browser
  }, 15000);

describe('Annotation tests are run here.', () => {
    // This is used to group related tests together.
    // Only one describe is used here but as the project becomes bigger, it may be necessary to ...
    // group them into different describe blocks
    describe('This should highlight complete words with no trailing space.', () => {
        
        // This is a single test
        it('Should open the annotate url', async () => {
            // const res = await driver.get('https://developer.mozilla.org');
            const res = await driver.get(url);
            await new Promise((r) => setTimeout(r, 2000));
            page = 'MainPage';
            // await driver.executeScript("monitorEvents($0, 'mouse')");
        } )

        describe("This should grab FULL_WORDS and test", () => {
            let myArr;
            let full_string;
            // let data_grabbing_extra_comma;
            let data_grabbing_extra_space;
            // let myArr_grabbing_extra_comma;
            let myArr_grabbing_extra_space;
            beforeAll(async () => {

                const line_elements = await driver.findElements(By.css('.FULL_WORDS p'));
                const line_element  = line_elements[0];
                
                // const line_element1  = line_elements[1];

                console.log(line_element);
                full_string = await line_element.getText();

                console.log("full_string::: ", full_string);

                let sourceEle = line_element;
                let targetEle = line_element;

                let offset = await targetEle.getRect();
                let x = await offset.x + 50;
                let y = await offset.y;
                const actions = driver.actions({async: true});

                await actions.move({origin:sourceEle});
                await actions.move({x:parseInt(x),y:parseInt(y)}).press().pause(500).perform();
                await actions.move({x:parseInt(x+200),y:parseInt(y)}).pause(500).release().perform();
                // await actions.pause(500).release().perform();

                data_grabbing_extra_space = await driver.executeScript("return window.getSelection().toString();");
                myArr_grabbing_extra_space = data_grabbing_extra_space.split(" ");

            })

            it('Should confirm that no partial word included.', async () => {
                
                expect(myArr_grabbing_extra_space.length).toBeGreaterThan(0);

                console.log(myArr_grabbing_extra_space);
                
                for(let e of myArr_grabbing_extra_space) {
                    // Notice that if the next line is grabbed, this will fail. "full_string" is first line and it does not contain words in the second line
                    expect(full_string).toContain(e); 
                }
            } )

            it('Should confirm that extra space is excluded.', async () => {
                const all_chars = data_grabbing_extra_space.split("");
                
                expect(all_chars[all_chars.length - 1] === " ").toBe(false);

            } )
        });
    })

    describe('This should highlight complete words with no trailing comma.', () => {
        // This is a single test
        it('Should open the annotate url', async () => {
            // const res = await driver.get('https://developer.mozilla.org');
            const res = await driver.get(url);
            await new Promise((r) => setTimeout(r, 2000));
            page = 'MainPage';
            // await driver.executeScript("monitorEvents($0, 'mouse')");
        } )

        describe("This should grab FULL_WORDS and test", () => {
            let myArr;
            let full_string;
            let data_grabbing_extra_comma;
            // let data_grabbing_extra_space;
            let myArr_grabbing_extra_comma;
            // let myArr_grabbing_extra_space;
            beforeAll(async () => {

                const line_elements = await driver.findElements(By.css('.FULL_WORDS p'));
                const line_element  = line_elements[0];
                
                // const line_element1  = line_elements[1];

                console.log(line_element);
                full_string = await line_element.getText();

                console.log("full_string::: ", full_string);

                let sourceEle = line_element;
                let targetEle = line_element;

                let offset = await targetEle.getRect();
                let x = await offset.x + 50;
                let y = await offset.y;
                const actions = driver.actions({async: true});

                // These three awaits are responsible for highlighting a trailing comma.
                await actions.move({origin:sourceEle});
                await actions.move({x:parseInt(x),y:parseInt(y)}).press().pause(500).perform();
                await actions.move({x:parseInt(x+100),y:parseInt(y)}).pause(500).release().perform();

                data_grabbing_extra_comma = await driver.executeScript("return window.getSelection().toString();");
                myArr_grabbing_extra_comma = data_grabbing_extra_comma.split(" ");

            })

            it('Should confirm that no partial word included.', async () => {
                
                expect(myArr_grabbing_extra_comma.length).toBeGreaterThan(0);

                console.log(myArr_grabbing_extra_comma);
                
                // This checks to make sure that no partial word is grabbed
                for(let e of myArr_grabbing_extra_comma) {
                    expect(full_string).toContain(e); 
                }
            } )

            it('Should confirm that extra comma is excluded.', async () => {

                for(let e of myArr_grabbing_extra_comma) {
                    expect(e.includes(',')).toBe(false);
                }

            } )
        });
    })
})

