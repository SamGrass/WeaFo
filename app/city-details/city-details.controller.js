angular.module('WeaFo').controller('cityDetailsController', ['$routeParams', 'wService', function($routeParams, wService) {
    const cd = this;
    cd.isActive = false;
    cd.iconUrl = wService.getIconBaseUrl();
    cd.cityData = {};
    cd.now = {};
    cd.displayDay = function (dailyDay, forecast) {
        cd.dailyForecastList = [];
        console.log(dailyDay);
        forecast.forEach(function (forecast) {
            if (forecast.time === dailyDay) {
                cd.dailyForecastList.push(forecast);
            }
        })
        console.log(cd.dailyForecastList);
        cd.isActive = true;
        console.log(cd.isActive);
    }

    wService.getCityFromName($routeParams.city)
        .then(function (res) {
            cd.cityData = new City(res.data);
            cd.now = cd.cityData.forecastList[0];
            console.log(cd.cityData);
        })
        .catch(function (err) {
            console.log(err.message);
        })

}])