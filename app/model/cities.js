class City {
    constructor(apiData) {
        this.name = apiData.city.name;
        this.coord = {
            latitude: apiData.city.coord.lat,
            longitude: apiData.city.coord.lon,
        }
        this.sunrise = new Date(apiData.city.sunrise * 1000);
        this.sunset = new Date(apiData.city.sunset * 1000);
        this.dailyAvgTemp = null;
        this.forecastList = apiData.list.map(data => {
            return {
                temp: data.main.temp,
                tempFelt: data.main.feels_like,

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
                var time = dateTime.toLocaleDateString('en-EN',{ weekday: 'long'});
                var icon = item.weather.icon;

                if (dailyData[time]) {
                    dailyData[time].sum += temp;
                    dailyData[time].count += 1;
                } else {
                    dailyData[time] = {
                        sum: temp,
                        count: 1,
                        icon: icon
                    };
                }
            })
            var dailyAvg = [];
            for (var [key] of  Object.entries(dailyData)) {
                var avg = Math.round(dailyData[key].sum / dailyData[key].count);
                dailyAvg.push({
                    date: key,
                    avgTemp: avg,
                    icon: dailyData[key].icon
                });
            }
            return dailyAvg;
        }
    }

}