function attachEvents() {
    $('#submit').on('click', getWeather);

    let weatherSymbols = {
        Sunny: '&#x2600',  // ☀
        Partly: '&#x26C5', // ⛅
        Overcast: '&#x2601',  // ☁
        Rain: '&#x2614',    // ☂
        Degrees: '&#176'   // °
    };

    function getWeather() {
        let inputLocation = $('#location').val();

        $.get('https://judgetests.firebaseio.com/locations.json')
            .then(function (res) {
                if(res.filter(x => x.name === inputLocation).length === 0){
                    throw new Error();
                }

                let objInputCode = res.filter(x => x.name === inputLocation)[0].code;

                $.get(`https://judgetests.firebaseio.com/forecast/today/${objInputCode}.json`)
                    .then(function (res) {
                        let locationName = res.name;
                        let highLowTemperature = res.forecast.high + '°' + '/' + res.forecast.low + '°';
                        let condition = res.forecast.condition;
                        if(condition === 'Partly sunny'){
                            condition = 'Partly';
                        }
                        let weatherPicture = weatherSymbols[condition];
                        if(condition === 'Partly'){
                            condition = 'Partly sunny';
                        }
                        $('#forecast').css({ 'display': "block" });
                        $('#current').append(
                            $(`<span class="condition symbol">${weatherSymbols[condition]}</span>`),
                            $(`<span class="condition">`).append(
                                $(`<span class="forecast-data">${locationName}</span>`),
                                $(`<span class="forecast-data">${highLowTemperature}</span>`),
                                $(`<span class="forecast-data">${condition}</span>`)
                            )
                        )
                    }).catch(function (err) {
                    $('#forecast').css({ 'display': "block" }).empty().append('Error');
                });

                $.get(`https://judgetests.firebaseio.com/forecast/upcoming/${objInputCode}.json`)
                    .then(function (res) {
                        drawForcast(res, 0);
                        drawForcast(res, 1);
                        drawForcast(res, 2);

                    }).catch(function (err) {
                    $('#forecast').css({ 'display': "block" }).empty().append('Error');
                });

            }).catch(function (error) {
            $('#forecast').css({ 'display': "block" }).empty().append('Error');
        });

        function drawForcast(res, index) {
            let conditionSymbol = res.forecast[index].condition;
            if(conditionSymbol === 'Partly sunny'){
                conditionSymbol = 'Partly';
            }
            let highLowTemperature = res.forecast[index].high + '°' + '/' + res.forecast[index].low + '°';
            let pictureSymbol = weatherSymbols[conditionSymbol];
            if(conditionSymbol === 'Partly'){
                conditionSymbol = 'Partly sunny';
            }
            $('#upcoming').append(
                $('<span class="upcoming">').append(
                    $(`<span class="symbol">${pictureSymbol}</span>`),
                    $(`<span class="forecast-data">${highLowTemperature}</span>`),
                    $(`<span class="forecast-data">${conditionSymbol}</span>`)
                ));
        }
    }
}