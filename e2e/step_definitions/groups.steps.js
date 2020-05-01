const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');

const feature1 = loadFeature('./e2e/features/groups/createGroup.feature');
const feature2 = loadFeature('./e2e/features/groups/createGroupSelectingFriends.feature');
const feature3 = loadFeature('./e2e/features/groups/viewGroup.feature');
const feature4 = loadFeature('./e2e/features/groups/editGroup.feature');

let port = 3000;
let url = 'http://localhost:' + port;

let webId1 = "https://viadees2atester3.inrupt.net/profile/card#me";
let username1 = "viadeES2Atester3";
let password1 = "viadeES2A_password_3";

let usuario1 = "https://alejandrine3.inrupt.net/profile/card#me";
let usuario2 = "https://jesusperez97.inrupt.net/profile/card#me";

let testGroupName1 = "Grupo de pruebas";
let testGroupName2 = "Grupo de pruebas seleccionando";
let testGroupName3 = "Grupo de pruebas ver";
let testGroupName4 = "Grupo de pruebas editar";
let testGroupName5 = "Grupo de pruebas editado";

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

    //Borrar cookies
    await page.goto('chrome://settings/clearBrowserData');
    await page.keyboard.down('Enter');
    
    await page.goto(url);

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

            await delay(3000);

            await page.waitForSelector('button[id="tabButton-1"]');
            await page.click('button[id="tabButton-1"]');
            
            await page.waitForSelector('input[name="group-name-field"]');
            await expect(page).toFill('input[name="group-name-field"]', testGroupName1);
            
            await page.waitForSelector('input[name="group-new-member-field"]');

            await expect(page).toFill('input[name="group-new-member-field"]', usuario1);
            await page.click('button[name="add-member"]');

            await expect(page).toFill('input[name="group-new-member-field"]', usuario2);
            await page.click('button[name="add-member"]');

            await delay(4000);
            
            await page.waitForSelector('button[name="saveGroup"]');
            await page.click('button[name="saveGroup"]');
            
            await delay(5000);
            
            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');
            await delay(2000);
            
            // Check the new group appears
            await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas"]');

            // Click on the group
            await page.click('div[name="group-container-Grupo de pruebas"]');

            // Check buttons appear
            await expect(page).toMatchElement('button[id="details-Grupo de pruebas"]');
            await expect(page).toMatchElement('button[id="edit-Grupo de pruebas"]');
            await page.click('button[id="edit-Grupo de pruebas"]');

            await delay(5000);

            await expect(page).toMatchElement('button[id="delete-group"]');
            await page.click('button[id="delete-group"]');

            await delay(5000);
        });

        then('Pepa cannot view the group', async () => {
            await page.goto("http://localhost:" + port + "/#/feed");

            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');

             //Expect the group to disappear
            var groupExists = null;
            try {
                groupExists = await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas"]');
            } catch (error) {
                //There will be an error if everything is alright
            }

            if (groupExists !== null) {
                throw new Error("The group was not removed");
            }
            await delay(3000);
        });
    });
});

defineFeature(feature2, test2 => {
    test2('Pepa wants to create a new group selecting members', ({ given, when, then }) => {

        given('Pepa has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pepa creates a group selecting his friends webIds', async () => {            
            await page.goto("http://localhost:" + port + "/#/feed");

            await page.waitForSelector('button[name="create-route-floating-button"]');
            await page.click('button[name="create-route-floating-button"]');

            await delay(3000);

            await page.waitForSelector('button[id="tabButton-1"]');
            await page.click('button[id="tabButton-1"]');
            
            await page.waitForSelector('input[name="group-name-field"]');
            await expect(page).toFill('input[name="group-name-field"]', testGroupName2);
            
            await delay(5000);

            await page.click('td[id="select-friend-https://alejandrine3.inrupt.net/profile/card#me"]');
            await page.click('td[id="select-friend-https://jesusperez97.inrupt.net/profile/card#me"]');
            
            await page.waitForSelector('button[id="add-selected-friends"]');
            await page.click('button[id="add-selected-friends"]');
            
            await delay(5000);
                        
            await page.waitForSelector('button[name="saveGroup"]');
            await page.click('button[name="saveGroup"]');
            
            await delay(5000);
            
            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');
            await delay(2000);
            
            // Check the new group appears
            await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas seleccionando"]');

            // Click on the group
            await page.click('div[name="group-container-Grupo de pruebas seleccionando"]');

            // Check buttons appear
            await expect(page).toMatchElement('button[id="details-Grupo de pruebas seleccionando"]');
            await expect(page).toMatchElement('button[id="edit-Grupo de pruebas seleccionando"]');
            await page.click('button[id="edit-Grupo de pruebas seleccionando"]');

            await delay(5000);

            await expect(page).toMatchElement('button[id="delete-group"]');
            await page.click('button[id="delete-group"]');

            await delay(5000);
        });

        then('Pepa cannot view the group', async () => {
            await page.goto("http://localhost:" + port + "/#/feed");

            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');

             //Expect the group to disappear
            var groupExists = null;
            try {
                groupExists = await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas seleccionando"]');
            } catch (error) {
                //There will be an error if everything is alright
            }

            if (groupExists !== null) {
                throw new Error("The group was not removed");
            }
            await delay(3000);
        });
    });
});

defineFeature(feature3, test3 => {
    test3('Pepa wants to view her group information', ({ given, when, then }) => {

        given('Pepa has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pepa creates a group and clicks on its details button', async () => {            
            await page.goto("http://localhost:" + port + "/#/feed");
            
            await delay(3000);

            await page.waitForSelector('button[name="create-route-floating-button"]');
            await page.click('button[name="create-route-floating-button"]');

            await delay(3000);

            await page.waitForSelector('button[id="tabButton-1"]');
            await page.click('button[id="tabButton-1"]');
            
            await page.waitForSelector('input[name="group-name-field"]');
            await expect(page).toFill('input[name="group-name-field"]', testGroupName3);
            
            await delay(3000);

            await page.click('td[id="select-friend-https://alejandrine3.inrupt.net/profile/card#me"]');
            await page.click('td[id="select-friend-https://jesusperez97.inrupt.net/profile/card#me"]');
            
            await page.waitForSelector('button[id="add-selected-friends"]');
            await page.click('button[id="add-selected-friends"]');
            
            await delay(5000);
                        
            await page.waitForSelector('button[name="saveGroup"]');
            await page.click('button[name="saveGroup"]');
            
            await delay(5000);
            
            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');
            await delay(2000);
            
            // Check the new group appears
            await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas ver"]');

            // Click on the group
            await page.click('div[name="group-container-Grupo de pruebas ver"]');

            // Check buttons appear
            await expect(page).toMatchElement('button[id="edit-Grupo de pruebas ver"]');
            await expect(page).toMatchElement('button[id="details-Grupo de pruebas ver"]');
            await page.click('button[id="details-Grupo de pruebas ver"]');
            
            await delay(5000);
        });

        then('Pepa can view the group members', async () => {
            await expect(page).toMatchElement('div[id="member-https://alejandrine3.inrupt.net/profile/card#me"]');
            await expect(page).toMatchElement('div[id="member-https://jesusperez97.inrupt.net/profile/card#me"]');
            
            await page.goto("http://localhost:" + port + "/#/feed");
            
            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');
            await delay(2000);
            
            // Check the new group appears
            await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas ver"]');

            // Click on the group
            await page.click('div[name="group-container-Grupo de pruebas ver"]');

            delay(3000);

            // Check buttons appear
            await expect(page).toMatchElement('button[id="details-Grupo de pruebas ver"]');
            await expect(page).toMatchElement('button[id="edit-Grupo de pruebas ver"]');
            await page.click('button[id="edit-Grupo de pruebas ver"]');

            await delay(5000);

            await expect(page).toMatchElement('button[id="delete-group"]');
            await page.click('button[id="delete-group"]');
            await delay(3000);
        });
    });
});

defineFeature(feature4, test4 => {
    test4('Pepa wants to edit some group information', ({ given, when, then }) => {

        given('Pepa has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pepa creates a group and edits it', async () => {            
            await page.goto("http://localhost:" + port + "/#/feed");
            
            await delay(3000);

            await page.waitForSelector('button[name="create-route-floating-button"]');
            await page.click('button[name="create-route-floating-button"]');

            await delay(5000);

            await page.waitForSelector('button[id="tabButton-1"]');
            await page.click('button[id="tabButton-1"]');
            
            await page.waitForSelector('input[name="group-name-field"]');
            await expect(page).toFill('input[name="group-name-field"]', testGroupName4);
            
            await delay(3000);

            await page.click('td[id="select-friend-https://alejandrine3.inrupt.net/profile/card#me"]');
            await page.click('td[id="select-friend-https://jesusperez97.inrupt.net/profile/card#me"]');
            
            await page.waitForSelector('button[id="add-selected-friends"]');
            await page.click('button[id="add-selected-friends"]');
            
            await delay(5000);
                        
            await page.waitForSelector('button[name="saveGroup"]');
            await page.click('button[name="saveGroup"]');
            
            await delay(5000);
            
            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');
            await delay(2000);
            
            // Check the new group appears
            await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas editar"]');

            // Click on the group
            await page.click('div[name="group-container-Grupo de pruebas editar"]');

            // Check buttons appear
            await expect(page).toMatchElement('button[id="details-Grupo de pruebas editar"]');
            await expect(page).toMatchElement('button[id="edit-Grupo de pruebas editar"]');
            await page.click('button[id="edit-Grupo de pruebas editar"]');


            // Cambiar nombre
            await page.waitForSelector('input[id="new-name-field"]');
            await expect(page).toFill('input[id="new-name-field"]', testGroupName5);

            await expect(page).toMatchElement('button[id="save-edit-button"]');
            await page.click('button[id="save-edit-button"]');
            
            await delay(3000);
        });

        then('Pepa can view the group has changed', async () => {            
            await page.goto("http://localhost:" + port + "/#/feed");
            await delay(2000);
            
            await page.waitForSelector('button[id="tab-feed.groups"]');
            await page.click('button[id="tab-feed.groups"]');
            await delay(2000);
            
            await expect(page).toMatchElement('div[name="group-container-Grupo de pruebas editado"]');

            await page.click('div[name="group-container-Grupo de pruebas editado"]');

            await expect(page).toMatchElement('button[id="details-Grupo de pruebas editado"]');
            await expect(page).toMatchElement('button[id="edit-Grupo de pruebas editado"]');
            await page.click('button[id="edit-Grupo de pruebas editado"]');

            await delay(5000);

            await expect(page).toMatchElement('button[id="delete-group"]');
            await page.click('button[id="delete-group"]');
            await delay(3000);
        });
    });
});