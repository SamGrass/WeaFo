class City {
    constructor(apiData) {
        this.name = apiData.city.name;
        this.coord = {
            latitude: apiData.city.coord.lat,
            longitude: apiData.city.coord.lon,
        }
        this.timezone = apiData.city.timezone / 60;
        this.currentHour = dayjs().utcOffset(this.timezone).format('HH:mm');
        this.sunrise = dayjs.unix(apiData.city.sunrise).utcOffset(this.timezone).format('HH:mm');
        this.sunset = dayjs.unix(apiData.city.sunset).utcOffset(this.timezone).format('HH:mm');

        this.forecastList = apiData.list.map(data => {
            return {
                temp: Math.round(data.main.temp * 10) / 10,
                tempFelt: Math.round(data.main.feels_like),
                weather: {
                    type: data.weather[0].main,
                    icon: data.weather[0].icon
                },
                wind: {
                    speed: Math.round(data.wind.speed * 10) / 10, // meter/sec
                    deg: data.wind.deg,
                    gust: data.wind.gust // meter/sec
                },

                pop: Math.round(data.pop * 100), // Probability of precipitation
                rain: data.rain ? Math.round(data.rain['3h'] * 10) / 10 : 0,
                snow: data.snow ? Math.round(data.snow['3h'] * 10) / 10 : 0,
                humidity: data.main.humidity,
                dt: data.dt,
                time: dayjs.unix(data.dt).utcOffset(this.timezone).format('dddd,  D  MMM'),
                hour: dayjs.unix(data.dt).utcOffset(this.timezone).hour(),
            }
        });
        this.dailyData = this.getDailyData();
    }

    getDailyData() {
        if (this.forecastList) {
            const dailyDataList = [];
            const dailyData = {};
            this.forecastList.forEach(item => {
                let temp = item.temp;
                let day = dayjs.unix(item.dt).utcOffset(this.timezone).format('dddd,  D  MMM');

                if (dailyData[day]) {
                    dailyData[day].sumTemp += item.tempFelt;
                    dailyData[day].sumPrecipitation += item.rain + item.snow;
                    dailyData[day].count += 1;
                    dailyData[day].temp.push(temp);
                    dailyData[day].tempFelt.push(item.tempFelt);
                    dailyData[day].humidity.push(item.humidity);
                    dailyData[day].wind.push(item.wind);
                    dailyData[day].rain.push(item.rain);
                    dailyData[day].snow.push(item.snow);
                    dailyData[day].pop.push(item.pop);
                } else {
                    dailyData[day] = {
                        date: day,
                        count: 1,
                        sumTemp: item.tempFelt,
                        temp: [temp],
                        tempFelt: [item.tempFelt],
                        humidity: [item.humidity],
                        icon: item.weather.icon,
                        iconPerHour: {
                            night: '',
                            morning: '',
                            afternoon: '',
                            evening: '',
                        },
                        wind: [{
                            speed: item.wind.speed,
                            deg: item.wind.deg,
                            gust: item.wind.gust
                        }],
                        sumPrecipitation: item.rain,
                        rain: [item.rain],
                        snow: [item.snow],
                        pop: [item.pop],
                    };
                    dailyDataList.push(dailyData[day]);
                }
                if (item.hour >= 5 && item.hour < 11) {
                    dailyData[day].iconPerHour.morning = item.weather.icon;
                }
                if (item.hour >= 11 && item.hour < 17) {
                    dailyData[day].iconPerHour.afternoon = item.weather.icon;
                }
                if (item.hour >= 17 && item.hour < 24) {
                    dailyData[day].iconPerHour.evening = item.weather.icon;
                }
                if (item.hour >= 0 && item.hour < 5) {
                    dailyData[day].iconPerHour.night = item.weather.icon;
                }

                dailyData[day].avgTemp = Math.round(dailyData[day].sumTemp / dailyData[day].count);
                dailyData[day].minTemp = Math.round(dailyData[day].temp.reduce((acc, temp) => acc < temp ? acc : temp));
                dailyData[day].maxTemp = Math.round(dailyData[day].temp.reduce((acc, temp) => acc > temp ? acc : temp));
            })

            return dailyDataList;
        }
    }
}