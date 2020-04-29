const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');

const feature1 = loadFeature('./e2e/features/groups/createGroup.feature');

let port = 3000;
let url = 'http://localhost:' + port;

let webId1 = "https://viadees2atester3.inrupt.net/profile/card#me";
let username1 = "viadeES2Atester3";
let password1 = "viadeES2A_password_3";

let webId2 = "https://alejandrine3.inrupt.net/profile/card#me";
let webId3 = "https://jesusperez97.inrupt.net/profile/card#me";

let testGroupName1 = "Grupo de pruebas";

var page;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

beforeAll(async () => {
    //Open browser
    const browser = await puppeteer.launch({
        //headless let watch the chrome window interacting with the application
        headless: false,
        defaultViewport: null
    });
    page = await browser.newPage();
    await page.goto(url);

    /** 
     *  ######################################################################################
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
        await expect(page).toFill('input[name="idp"]', webId1);
        await page.click('[type="submit"]');

        //Wait for user-pass screen
        await page.waitForSelector('input[name="username"]');
        //Fill user and pass
        await expect(page).toFill('input[name="username"]', username1);
        await expect(page).toFill('input[name="password"]', password1);
        await page.click('[id="login"]');

        //Wait for the main nav-bar icon
        await page.waitForSelector('img[src="img/bars-nav.svg"]');
    } else {
        //Wait for the main nav-bar icon
        await page.waitForSelector('img[src="img/bars-nav.svg"]');
    }

    await page.goto("http://localhost:" + port + "/#/feed");

    // Add Alejandro
    await page.waitForSelector('button[name="create-route-floating-button"]');
    await page.click('button[name="create-route-floating-button"]');

    await page.waitForSelector('input[name="value-friend-webID"]');
    await expect(page).toFill('input[name="value-friend-webID"]', webId2);

    await page.click('button[name="add-friend-button"]');

    await delay(5000);

    // Add Jesus
    await page.waitForSelector('button[name="create-route-floating-button"]');
    await page.click('button[name="create-route-floating-button"]');

    await page.waitForSelector('input[name="value-friend-webID"]');
    await expect(page).toFill('input[name="value-friend-webID"]', webId3);

    await page.click('button[name="add-friend-button"]');

    await delay(5000);

});


defineFeature(feature1, test1 => {
    test1('Pepa wants to create a new group', ({ given, when, then }) => {

        given('Pepa has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pepa creates a group introducing his friends webIds', async () => {
            await page.goto("http://localhost:" + port + "/#/feed");

            await page.waitForSelector('button[name="create-route-floating-button"]');
            await page.click('button[name="create-route-floating-button"]');

            await page.waitForSelector('button[name="tabButton-1"]');
            await page.click('button[name="tabButton-1"]');
            
            
            await page.waitForSelector('input[name="group-name-field"]');
            await expect(page).toFill('input[name="group-name-field"]', testGroupName1);
            
            /**
            await page.waitForSelector('input[name="group-new-member-field"]');

            await expect(page).toFill('input[name="group-new-member-field"]', webId2);
            await page.click('button[name="add-member"]');
            delay(5000);

            await expect(page).toFill('input[name="group-new-member-field"]', webId3);
            await page.click('button[name="add-member"]');
            delay(5000);
            */

           await page.click('button[name="saveGroup"]');
           delay(5000);

           await page.waitForSelector('button[name="feed-tab-1"]');
           await page.click('button[name="feed-tab-1"]');
           delay(2000);
        });

        then('Pepa can view the group in the feed', async () => {          
            // Check the new group appears
            await page.waitForFunction('document.querySelector("body").innerText.includes("Grupo de pruebas")');
            await page.waitForSelector('div[name="group-container-Grupo de pruebas"]');
            // Click on the group
            await page.click('div[name="group-container-Grupo de pruebas"]');
            // Check buttons appear
            await expect(page).toMatchElement('button[name="group-details-Grupo de pruebas"]');
            await expect(page).toMatchElement('button[name="group-edit-Grupo de pruebas"]');
        });
    });
});
