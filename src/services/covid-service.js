import geocode from "react-geocode";
import { monthsShort } from "moment";

class CovidService {

  async getCovidInfoByCountry(country,shortName) {
    const axios = require("axios");
    var res;

    await axios({
      "method": "GET",
      "url": "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_COVID_API_KEY
      }, "params": {
        "country": country
      }
    }).then((response) => {
      res = response.data.data
    }).catch((error) => {
      console.error(error)
    });

    if(res.location === "Global")
    await axios({
        "method": "GET",
        "url": "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_COVID_API_KEY
        }, "params": {
          "country": shortName
        }
      }).then((response) => {
          console.log(shortName)
          console.log("segundo intento:")
          console.log(response.data.data)
        res = response.data.data
      }).catch((error) => {
        console.log(error)
      });

    return res;
  }

  async getCovidByCoordinates(lat, long) {
    geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    var country = "Global";
    var shortName = "Global";

    await geocode.fromLatLng(lat, long).then(
      (response) => {
          response.results[0].address_components.forEach(element => {
              if(element.types.includes("country")){
              country = element.long_name
              shortName = element.short_name
              }
          });
      },
      (error) => {
        console.error(error);
      }
    );

    if (country) return await this.getCovidInfoByCountry(country,shortName);
  }
}
const covidService = new CovidService();

export default covidService;
