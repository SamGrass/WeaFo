angular.module('WeaFo').controller('headerController', ['wService', '$location', function(wService, $location) {
    const hd = this;
    hd.searchBox = '';
    hd.onDetails = function (city) {
        $location.path(`/city-details/${city}`);
        hd.searchBox = '';
    }
    hd.getCityTypeahead = function (city) {
        return wService.getNameFromSearchBox(city).then(function (res) {

            return res.data.map(function (item) {
                return `${item.name}, ${item.state + ',' || ''} ${item.country || ''}`
            });

        }).catch(function (err) {
            console.log(err.message)
            return [];
        });
    }
}])