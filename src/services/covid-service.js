import geocode from "react-geocode";

class CovidService {
  async getCovidInfoByCountry(country) {
    const axios = require("axios");
    var res;
await axios({
    "method":"GET",
    "url":"https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-19-coronavirus-statistics.p.rapidapi.com",
    "x-rapidapi-key":process.env.REACT_APP_COVID_API_KEY
    },"params":{
    "country":country
    }
    })
    .then((response)=>{
      res = response.data.data
    })
    .catch((error)=>{
      console.log(error)
    })
    return res;
  }

  async getCovidByCoordinates(lat, long) {
    geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    var country;
    await geocode.fromLatLng(lat, long).then(
      (response) => {
        country = response.results[0].address_components[4].long_name;
      },
      (error) => {
        console.error(error);
      }
    );
    if (country) return await this.getCovidInfoByCountry(country);
  }
}
const covidService = new CovidService();
export default covidService;
