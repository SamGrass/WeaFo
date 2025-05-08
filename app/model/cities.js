class City {
    constructor(apiData) {
        this.name = apiData.city.name;
        this.coord = {
            latitude: apiData.city.coord.lat,
            longitude: apiData.city.coord.lon,
        }
        this.timezone = apiData.city.timezone / 60;
        this.tz = dayjs().utcOffset(this.timezone).format('Z');
        this.sunrise = dayjs.unix(apiData.city.sunrise).utcOffset(this.timezone).format('HH:mm');
        this.sunset = dayjs.unix(apiData.city.sunset).utcOffset(this.timezone).format('HH:mm');

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

                pop: Math.round(data.pop * 100), // Probability of precipitation
                rain: data.rain ? data.rain['3h'] : 0,
                snow: data.snow ? data.snow['3h'] : 0,
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
                let temp = Math.round(item.temp);
                let dateTime = item.dt;
                let day = dayjs.unix(dateTime).utcOffset(this.timezone).format('dddd,  D  MMM');

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
                            speed: Math.round(item.wind.speed * 10) / 10,
                            direction: item.wind.direction,
                            gust: item.wind.gust
                        },
                        rain: Math.round(item.rain * 10) / 10,
                        snow: Math.round(item.snow * 10) / 10,
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