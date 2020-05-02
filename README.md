[![Build Status](https://travis-ci.org/Arquisoft/viade_es2a.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_es2a)
[![codecov](https://codecov.io/gh/Arquisoft/viade_es2a/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_es2a)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0cbfbb7da46c44b484c6da73109b4deb)](https://www.codacy.com/gh/Arquisoft/viade_es2a?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_es2a&amp;utm_campaign=Badge_Grade)

# VIADE ES2A

This repository contains a skeleton of the VIADE project.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_es2a/](https://arquisoft.github.io/viade_es2a/) which also contains a [technical documentation](https://arquisoft.github.io/viade_es2a/docs/index.html).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_es2a/wiki).

### Launching Unitary Tests

You need to install the dependencies needed for the project by executing the following command

```bash
npm install
# or "yarn install"
```

Now you can run all the tests:

```bash
npm test a
```

### Launching Acceptance Tests

First of all, you need to install puppeteer. It'll automatically download the chromium browser in which the tests will take place.

```bash
npm install puppeteer
# or "yarn add puppeteer"
```

Now you can run the tests:

```bash
npm run test:e2e
```

### Docker Deployment Instructions

In order to deploy our Viade application using docker engine we have to clone this repository
in your local machine and you will need to have installed Docker too.
In this case we are using Docker Toolbox in a Windows machine


To start over we start the docker machine by opening a docker quickstart terminal, which shows
us the IP of our docker machine. In our case this IP was 192.168.99.100.

Assuming that we have our repository cloned, we move to the folder with 

```bash	
cd "path to repository source folder"
```

First of all, to be able to deploy our app using a SOLID POD server, we need to download 
the official image nodesolidserver from DockerHub 
https://hub.docker.com/r/nodesolidserver/node-solid-server

```bash
docker pull nodesolidserver/node-solid-server
```
	
The next step will be to run the container for the server that will use this image.

```bash
docker run -p 8443:8443 --name solid nodesolidserver/node-solid-server
```
	
Once executed, it is available via navegator on docker machine´s IP and the port for
the container (in our case https://192.168.99.100:8443/) where it is required to
log in and access the solid server protoype implementation.

The next step would be to create the container for Viade node app, using a Dockerfile 

```bash
FROM node:12.14.1
EXPOSE 3000:3000
COPY . /app
WORKDIR /app
RUN npm installed
CMD ["node", "--max_old_space_size=4112", "scripts/start.js"]
```

Next, execute the command to build this container:

```bash
docker build -t node .
```

Lastly, running the container using:

```bash
docker run -p 3000:3000 --name viade_es2a node
```
Now, accessing to this URL of the docker engine IP and port 3000 (http://192.168.99.100:3000/)
is possible to use Viade_es2a deployed using Docker.

## Authors
-   Marcos Álvarez Vidal
-   Sergio Corral Cristo
-   Jesús Pérez Noriega
-   Alejandro León Pereira
-   Nerea Valdés Egocheaga
-   Álvaro Tango Fernández
-   Luis Fuertes Camporro