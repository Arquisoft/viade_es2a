//Configuración para los test de end-to-end
module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.steps\\.js$',
  //Se ha ampliado el tiempo de espera porque a veces es muy lenta la aplicación, sobre todo
  //al principio cuando se abre con npm start
  testTimeout: 60000
}