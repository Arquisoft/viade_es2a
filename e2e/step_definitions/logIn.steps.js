const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/logIn.feature');

let url = 'http://localhost:3000';
let webId;
let username;
let password;

var page;

/**
 * Methods can be found in
 * https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page
 * https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer#toFill
 */

defineFeature(feature, test => {

    beforeAll(async () => {
        //Abrir navegador y una pestaña, y ir a la url
        const browser = await puppeteer.launch({
            //headless es para poder ver la ventana del chrome y ver como se simula la interacción humana
            headless: false,
            defaultViewport: null
        });
        page = await browser.newPage();
        await page.goto(url);
    });

    test('Alex wants to log into the application', ({ given, when, then }) => {

        given('Alex has a solid webId', () => {
            webId = "https://alejandrine3.inrupt.net/profile/card#me";
            username = "alejandrine3";
            password = "Muysecret4";
        });

        when('Alex opens the application, and logs in', async () => { //Las funciones en las que se use await deben ser asíncronas
            //Se ha autologueado el usuario?
            //Se espera a que aparezca el boton de loguearse
            await page.waitForSelector('button[data-testid="provider-form-button"]');
            //Se comprueba si se ha logueado automaticamente
            const logueate = await expect(page).toMatchElement('button[data-testid="provider-form-button"]');
            //Si no se ha autologueado
            if (logueate !== null) {
                //Rellenar webId
                await expect(page).toFill('input[name="idp"]', webId);
                await page.click('[type="submit"]');

                //Se espera a que aparezca la pantalla de usuario y contraseña
                await page.waitForSelector('input[name="username"]');
                //Se rellena usuario y contraseña
                await expect(page).toFill('input[name="username"]', username);
                await expect(page).toFill('input[name="password"]', password);
                await page.click('[id="login"]');
            }
        });

        then('Then Alex can view the welcome screen after having logged in', async () => {
            //Se espera a que aparezca uno de los iconos de la barra principal de navegación
            await page.waitForSelector('img[src="img/bars-nav.svg"]');
        });

    });

});