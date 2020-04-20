/**
 * Methods can be found in
 * https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page
 * https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer#toFill
 * https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pageselector
 */

const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/example.feature');


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
 * These beforeAll statement deletes all routes in the pod,
 * so the test could execute the same way all times.
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

    /** ######################################################################################
     *  ################# Log in #############################################################
     *  ######################################################################################
     */

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

    /** ######################################################################################
     *  ################# Delete existing routes if needed ###################################
     *  ######################################################################################
     */
    /*
    let isThereAnyRoute = true;
    //Mientras haya rutas
    while (isThereAnyRoute) {

        //Go to my-routes
        await page.goto("http://localhost:" + port + "/#/my-routes");

        try {

            //Mientras haya rutas se borran

            //Click on the route
            await page.waitForSelector('div[className="rwrapper"]');
            await page.click('div[className="rwrapper"]');

            //Click on details
            await page.waitForSelector('button[name="route-details"]');
            await page.click('button[name="route-details"]');

            //Remove the route
            await page.waitForSelector('button[name="delete-route-button"]');
            await page.click('button[name="delete-route-button"]');

            //Click on confirm
            await page.waitForSelector('button[data-testid="acceptButton"]');
            await page.click('button[data-testid="acceptButton"]');

            //wait for page to reload
            await delay(5000);
        } catch (error) {
            //Cuando no haya, se sale del bucle
            isThereAnyRoute = false;
        }
    }
    */

});


defineFeature(feature, test => {

    test('Alex wants to do a example', ({ given, when, then }) => {

        given('Alex has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('example', () => {

        });

        then('example', () => {

        });

    });

});