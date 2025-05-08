class City {
    constructor(apiData) {
        this.name = apiData.city.name;
        this.coord = {
            latitude: apiData.city.coord.lat,
            longitude: apiData.city.coord.lon,
        }
        this.timezone = apiData.city.timezone / 60;
        this.sunrise = dayjs.unix(apiData.city.sunrise).utcOffset(this.timezone).format('HH:mm');
        this.sunset = dayjs.unix(apiData.city.sunset).utcOffset(this.timezone).format('HH:mm');

        this.forecastList = apiData.list.map(data => {
            return {
                temp: Math.round(data.main.temp),
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
                dt: data.dt,
                time: data.dt_txt,
                hour: dayjs.unix(data.dt).utcOffset(this.timezone).format('HH:mm'),
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
                    dailyData[day].sum += temp;
                    dailyData[day].count += 1;
                    dailyData[day].temp.push(temp);
                } else {
                    dailyData[day] = {
                        date: day,
                        sum: temp,
                        temp: [temp],
                        count: 1,
                        icon: item.weather.icon,
                        wind: {
                            speed: item.wind.speed,
                            deg: item.wind.deg,
                            gust: item.wind.gust
                        },
                        rain: item.rain,
                        snow: item.snow,
                    };
                    dailyDataList.push(dailyData[day]);
                }
                dailyData[day].avgTemp = Math.round(dailyData[day].sum / dailyData[day].count);
                dailyData[day].minTemp = dailyData[day].temp.reduce((acc, temp) => acc < temp ? acc : temp);
                dailyData[day].maxTemp = dailyData[day].temp.reduce((acc, temp) => acc > temp ? acc : temp);
            })

            return dailyDataList;
        }
    }
}