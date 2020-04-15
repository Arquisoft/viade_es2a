const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature = loadFeature('./e2e/features/logIn.feature');

let url;
let webId;
let username;
let password;

/**
 * Methods can be found in
 * https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page
 * https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer#toFill
 */

defineFeature(feature, test => {

    test('Alex wants to log into the application', ({ given, when, then }) => {

        given('Alex has a solid webId', () => {
            url = 'http://localhost:3000';
            webId = "https://alejandrine3.inrupt.net/profile/card#me";
            username = "alejandrine3";
            password = "Muysecret4";
        });

        when('Alex opens the application, and logs in', async () => { //Las funciones en las que se use await deben ser asíncronas

            //Abrir navegador y una pestaña, y ir a la url
            const browser = await puppeteer.launch({
                //headless es para poder ver la ventana del chrome y ver como se simula la interacción humana
                headless: false,
                defaultViewport: null
            });
            const page = await browser.newPage();
            await page.goto(url);

            //Se ha autologueado el usuario?
            const logueate = await expect(page).toMatchElement('button[data-testid="provider-form-button"]');
            //Si no se ha autologueado
            if (logueate != null) {
                //Rellenar webId
                await expect(page).toFill('input[name="idp"]', webId);
                await page.click('[type="submit"]');
                //Suele tardar mucho, por eso se espera 10 segundos,
                //porque sino no espera el await lo suficiente
                await delay(12000);

                //Se rellena usuario y contraseña
                await expect(page).toFill('input[name="username"]', username);
                await expect(page).toFill('input[name="password"]', password);
                await page.click('[id="login"]');
            }
        });

        then('Then Alex can view the welcome screen after having logged in', async () => {

        });

    });

    //A veces el away no espera suficiente, por ejemplo al introducir el webid, ya que tarda demasiado.
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

});