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
        await driver.executeScript(monitorEvents($0, 'mouse'));
    } )

    it('Should select the full string', async () => {
        // const res = await driver.get('https://developer.mozilla.org');
        const line_elements = await driver.findElements(By.css('.FULL_WORDS p'));
        const line_element  = line_elements[0];
        // console.log(line_elements);
        const actions = driver.actions();
        
        console.log(await line_element.getText());
        const full_string = await line_element.getText();
        const current_position = await line_element.getRect();
        const current_x = await current_position.x;
        const current_y = await current_position.y;

        await actions.move({duration:1000,origin:line_element}).perform();
        // await actions.pause(10000).move({origin:line_element}).press().pause(1000).move({x:parseInt(current_x) + 60,y:parseInt(current_y)}).pause(1000).perform();
            // .click().perform();
        // await actions.move({duration:1000,origin:line_element}).perform();
        // await actions.pause(1000).move({origin:line_element}).press().pause(1000)
        await actions.press().pause(500).move({x:parseInt(current_x) + 30,y:parseInt(current_y)}).pause(1000).perform();
        
        console.log("current_x: ", current_x);
        // await actions.move({x:parseInt(current_x) + 20,y:parseInt(current_y)}).release().pause(1000);
        console.log("current_x: ", current_x);
        // await actions.dragAndDrop(line_element, {x:parseInt(current_x) + 2,y:parseInt(current_y)}).perform();
        await actions.perform();
        // await driver.manage().window().setRect({ width: 1030, height: 768 });
        await driver.executeScript("var evt = document.createEvent(\"MouseEvents\");evt.initEvent(\"mouseup\", true, true);document.dispatchEvent(evt);");
        await driver.executeScript("console.log(4837473);");
        var data = await driver.executeScript("return window.getSelection().toString();");
        const myArr = data.split(" ");
        
        for(let e of myArr) {
            // console.log(e);
            expect(full_string).toContain(e); 
        }

        // expect(1).toBe(0); 

        // await driver.executeScript("arguments[0].setAttribute('value', '" + test_username +"')", username_input);




    } )

    it('Should select the full string', async () => {
        // const res = await driver.get('https://developer.mozilla.org');
        const line_elements = await driver.findElements(By.css('.FULL_WORDS p'));
        const line_element  = line_elements[0];
        // console.log(line_elements);
        const actions = driver.actions();
        
        console.log(await line_element.getText());
        const full_string = await line_element.getText();
        const full_string_position = await line_element.getRect();
        const initial_position_x = await full_string_position.x;
        const initial_position_y = await full_string_position.y;

        await actions.move({x:parseInt(initial_position_x) + 30,y:parseInt(initial_position_y)}).perform();
        await actions.press().pause(500).perform();
        await actions.move({x:parseInt(initial_position_x) + 30,y:parseInt(initial_position_y) + 50}).pause(1000).perform();
        var text = `var evt = document.createEvent(\"MouseEvents\");evt.initEvent(\"mouseup\", true, true);document.elementFromPoint(${initial_position_x + 30}, ${initial_position_y}).dispatchEvent(evt);`
        await driver.executeScript(text);
        // await actions.move({x:parseInt(initial_position_x) + 30,y:parseInt(initial_position_y)}).click().perform();
        // await actions.pause(10000).move({origin:line_element}).press().pause(1000).move({x:parseInt(current_x) + 60,y:parseInt(current_y)}).pause(1000).perform();
            // .click().perform();
        // await actions.move({duration:1000,origin:line_element}).perform();
        // await actions.pause(1000).move({origin:line_element}).press().pause(1000)
        // await actions.press().pause(500).move({x:parseInt(current_x) + 30,y:parseInt(current_y) + 30}).pause(1000).perform();
        
        
        // await driver.manage().window().setRect({ width: 1030, height: 768 });
        // await driver.executeScript("var evt = document.createEvent(\"MouseEvents\");evt.initEvent(\"mouseup\", true, true);document.dispatchEvent(evt);");
        await driver.executeScript("console.log(4837473);");
        var data = await driver.executeScript("return window.getSelection().toString();");
        const myArr = data.split(" ");
        expect(myArr.length).toBeGreaterThan(0);

        console.log("myArr: ", myArr);

        
        for(let e of myArr) {
            // console.log(e);
            expect(full_string).toContain(e); 
        }

        // expect(1).toBe(0); 

        // await driver.executeScript("arguments[0].setAttribute('value', '" + test_username +"')", username_input);




    } )






})