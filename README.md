[![Build Status](https://travis-ci.org/Arquisoft/viade_es2a.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_es2a)
[![codecov](https://codecov.io/gh/Arquisoft/viade_es2a/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_es2a)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0cbfbb7da46c44b484c6da73109b4deb)](https://www.codacy.com/gh/Arquisoft/viade_es2a?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_es2a&amp;utm_campaign=Badge_Grade)

# VIADE ES2A

This repository contains a skeleton of the VIADE project.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_es2a/](https://arquisoft.github.io/viade_es2a/) which also contains a [technical documentation](https://arquisoft.github.io/viade_es2a/docs/index.html).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_es2a/wiki).

## Acceptance Tests

We use [puppeteer](https://github.com/puppeteer/puppeteer) and [cucumber](https://github.com/cucumber/cucumber) to test the application from the front end to the back end simulating the user interaction with the app.
With cucumber is easier to show the product owner that the application is satisfying the requeriments, because he can understand what the test is doing by only reading that, for example:

![](https://raw.githubusercontent.com/Arquisoft/viade_es2a/cucumber-puppeteer_testing/src/docs/images/ejemploCucumber.PNG)

And the developers have in mind all time what they need to do, because its also on the code!

![](https://raw.githubusercontent.com/Arquisoft/viade_es2a/cucumber-puppeteer_testing/src/docs/images/ejemploCucumber2.PNG)

There is a example of the puppeteer code inside the cucumber statement:

![](https://raw.githubusercontent.com/Arquisoft/viade_es2a/cucumber-puppeteer_testing/src/docs/images/ejemploPuppeteer.PNG)

With puppeteer, you can click on the page elements, navigate to url's, etc.

Here it is the package structure:

![](https://raw.githubusercontent.com/Arquisoft/viade_es2a/cucumber-puppeteer_testing/src/docs/images/estructurae2e.PNG)

The requeriments are in the .feature files, and the puppeteer code that simulates the user interaction trying some requeriment is in the .step.js files.

### Launching the tests

Firs you need to install puppeteer. It'll automatically download the chromium browser in which the user interaction simulation will take place.

```bash
npm install puppeteer
# or "yarn add puppeteer"
```

Now you can run the tests:

```bash
npm run test:e2e
```

## Authors
-   Marcos Álvarez Vidal
-   Sergio Corral Cristo
-   Jesús Pérez Noriega
-   Alejandro León Pereira
-   Nerea Valdés Egocheaga
-   Álvaro Tango Fernández
-   Luis Fuertes Camporro