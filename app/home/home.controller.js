angular.module('WeaFo').controller('homeController', ['weatherService', function (weatherService) {

    class City {
        constructor(apiData) {
            this.name = apiData.city.name;
            this.coord = {
                latitude: apiData.city.coord.lat,
                longitude: apiData.city.coord.lon,
            }
            this.sunrise = new Date(apiData.city.sunrise * 1000);
            this.sunset = new Date(apiData.city.sunset * 1000);

            this.forecastList = apiData.list.map(data => {
                return {
                    temp: data.main.temp,
                    tempFelt: data.main.feels_like,
                    dailyAvgTemp: null,
                    weather: {
                        type: data.weather[0].main,
                        icon: data.weather[0].icon
                    },
                    wind: {
                        speed: data.wind.speed, // meter/sec
                        direction: data.wind.deg,
                        gust: data.wind.gust // meter/sec
                    },

                    pop: data.pop, // Probability of precipitation (0 to 1)
                    rain: data.rain ? data.rain['3h'] : null,
                    snow: data.snow ? data.snow['3h'] : null,
                    time: data.dt_txt,
                }
            });
        }

        getDailyAvgTemp() {
            if (this.forecastList) {
                var dailyData = {};
                this.forecastList.forEach(item => {
                    var temp = item.temp;
                    var dateTime = new Date(item.time);
                    var time = dateTime.toDateString();

                    if (dailyData[time]) {
                        dailyData[time].sum += temp;
                        dailyData[time].count += 1;
                    } else {
                        dailyData[time] = {
                            sum: temp,
                            count: 1
                        };
                    }
                })
                var dailyAvg = [];
                for (var [key] of  Object.entries(dailyData)) {
                    var avg = Math.round(dailyData[key].sum / dailyData[key].count);
                    dailyAvg.push({
                        date: key,
                        avgTemp: avg
                    });
                }
                return dailyAvg;
            }
        }
    }
    var home = this;
    home.cityDataList = [];
    home.cities = ["London", "Tokyo", "New York", "Paris", "Rome", "Sydney", "Cairo", "Rio de Janeiro", "Toronto", "Berlin"];


    angular.forEach(home.cities, function (city) {
        weatherService.getCityFromName(city).then(function (res) {
            var cityData = new City(res.data);
            console.log(cityData.getDailyAvgTemp());
            console.log(cityData);
            cityData.dailyAvgTemp = cityData.getDailyAvgTemp();
            home.cityDataList.push(cityData);

        }).catch(function (err) {
            console.log(err.message);
        })
    })
}]);
