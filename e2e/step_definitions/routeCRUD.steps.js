/**
 * Methods can be found in
 * https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page
 * https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer#toFill
 */

const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/createRoute.feature');
const feature2 = loadFeature('./e2e/features/deleteRoute.feature');

let port = 3000;
let url = 'http://localhost:' + port;
let webId = "https://alejandrine3.inrupt.net/profile/card#me";
let username = "alejandrine3";
let password = "Muysecret4";

var page;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

/**
 * First, the user logs in. Then all the test run.
 */
beforeAll(async () => {
    //Open browser
    const browser = await puppeteer.launch({
        //headless let watch the chrome window interacting with the application
        headless: false,
        defaultViewport: null
    });
    page = await browser.newPage();
    await page.goto(url);

    //Wait for login button
    await page.waitForSelector('button[data-testid="provider-form-button"]');
    //Check if already logged
    const logueate = await expect(page).toMatchElement('button[data-testid="provider-form-button"]');
    //If not already logged
    if (logueate !== null) {
        //Fill webId
        await expect(page).toFill('input[name="idp"]', webId);
        await page.click('[type="submit"]');

        //Wait for user-pass screen
        await page.waitForSelector('input[name="username"]');
        //Fill user and pass
        await expect(page).toFill('input[name="username"]', username);
        await expect(page).toFill('input[name="password"]', password);
        await page.click('[id="login"]');

        //Wait for the main nav-bar icon
        await page.waitForSelector('img[src="img/bars-nav.svg"]');
    } else {
        //Wait for the main nav-bar icon
        await page.waitForSelector('img[src="img/bars-nav.svg"]');
    }
});

defineFeature(feature, test => {

    test('Alex wants to create a new route', ({ given, when, then }) => {

        given('Alex has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Alex creates a route with some points, name and description but without multimedia', async () => { //Las funciones en las que se use await deben ser asíncronas

            //Go to my-routes
            await page.goto("http://localhost:" + port + "/#/my-routes");

            //Click on add-route button
            await page.waitForSelector('button[class="sc-fYxtnH fdJbAS"]');
            await page.click('button[class="sc-fYxtnH fdJbAS"]');

            //Fill fields
            await page.waitForSelector('input[class="value-name"]');
            await expect(page).toFill('input[class="value-name"]', "Ruta Cucumber-Puppeteer");
            await expect(page).toFill('textarea[class="value-description"]', "Descripción de la ruta Cucumber-Puppeteer");

            //Get map coordinates
            //const div = await page.evaluate(() => document.querySelector('div[class="sc-kjoXOD bJBHfN"]'));
            //const rect = div.getBoundingClientRect();

            // 4 standar points
            await page.mouse.move(300, 300);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(330, 310);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(360, 300);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(390, 310);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(420, 300);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);


            // 4 waypoints
            await page.click('button[class="sc-jVODtj jahyGs button"]');
            await page.mouse.move(300, 350);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            //Wait for modal to close...
            await delay(2500);

            await page.click('button[class="sc-jVODtj jahyGs button"]');
            await page.mouse.move(330, 360);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(2500);

            await page.click('button[class="sc-jVODtj jahyGs button"]');
            await page.mouse.move(360, 350);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });

            await expect(page).toFill('input[class="waypoint_name"]', "Nombre waypoint 1 cucumber-puppeteer");
            await expect(page).toFill('input[class="waypoint_description"]', "Descripción 1 waypoint cucumber-puppeteer");

            //Guardar ruta
            await page.click('button[class="buttonToSave"]');

        });

        then('Alex can view the route on the feed', async () => {
            await page.waitForFunction('document.querySelector("body").innerText.includes("Ruta Cucumber-Puppeteer")');
        });

    });

});

//TODO
defineFeature(feature2, test2 => {

    test2('Alex wants to delete a route', ({ given, when, then }) => {

        given('Alex has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Alex deletes a route', async () => { //Las funciones en las que se use await deben ser asíncronas

            //Go to my-routes
            //await page.goto("http://localhost:" + port + "/#/my-routes");

            //await page.waitForFunction('document.querySelector("body").innerText.includes("Ruta Cucumber-Puppeteer")');
            //await page.click('document.querySelector("body").innerText.includes("Ruta Cucumber-Puppeteer")');
        });

        then('Alex cant view the route on the feed anymore', async () => {
            //const routeExists = await page.waitForFunction('document.querySelector("body").innerText.includes("Ruta Cucumber-Puppeteer")');
            //expect(routeExist).toBe(null);
        });

    });

});