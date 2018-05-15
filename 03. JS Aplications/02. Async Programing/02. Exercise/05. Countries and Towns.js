function solution() {
    const username = 'guest';
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    const URL = `https://baas.kinvey.com/appdata/kid_HkXPJOqcM/`;

    //counties
    $('#btnLoadCountries').on('click', loadCounties);

    function loadCounties() {
        $.ajax({
            method: 'GET',
            url: URL + 'countries',
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: listAllCountry
        });

        function listAllCountry(countries) {
            $('#post-countries').empty();
            for (const country of countries) {
                let li = $(`<li><input id="inputLiCountry" type="text" value="${country.name}"></input> </li>`);
                let btnUpdate = $('<button id="update">').text('Update').on('click', updateCountryName.bind(country));
                let btnDelete = $('<button id="delete">').text('Delete').on('click', deleteCountryName.bind(country));
                li.append(btnUpdate);
                li.append(btnDelete);
                $('#post-countries').append(li);
            }
        }
    }

    $('#btnAddCountry').on('click', addCountry);

    function addCountry() {
        let inputName = $('#nameField').val();

        $.ajax({
            method: 'Post',
            url: URL + 'countries',
            data: JSON.stringify({
                name: inputName
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadCounties
        });

        $('#nameField').val('');
    }

    function updateCountryName(ev) {
        let fieldVal = $(ev.target).parent().find('input').val();
        $.ajax({
            method: 'PUT',
            url: URL + 'countries/' + this._id,
            data: JSON.stringify({
                name: fieldVal
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadCounties
        });
    }

    function deleteCountryName() {
        $.ajax({
            method: 'DELETE',
            url: URL + 'countries' + '/' + this._id,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadCounties
        })
    }




    //towns
    $('#btnLoadTowns').on('click', loadTownsInOption);

    function loadTownsInOption() {
        $.ajax({
            method: 'GET',
            url: URL + 'countries',
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadInOptions
        });

        function loadInOptions(countries) {
            $('#select-countries').empty();
            for (const country of countries) {
                $('#select-countries').append($('<option>').text(country.name).val(country._id));
            }
        }

    }

    $('#btnViewTowns').on('click', listAllTowns);

    function listAllTowns() {
        let selectedCountryId = $('#select-countries option:selected').val();
        if (!selectedCountryId) {
            return;
        }

        $.ajax({
            method: 'GET',
            url: URL + 'towns',
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: displayTownsForCountry
        });

        function displayTownsForCountry(towns) {
            $('#post-towns').empty();
            for (const town of towns) {
                if (town.countryId === selectedCountryId) {
                    let li = $(`<li><input id="inputLiTown" type="text" value="${town.townName}"></input> </li>`);
                    let btnUpdate = $('<button id="update">').text('Update').on('click', updateTownName.bind(town));
                    let btnDelete = $('<button id="delete">').text('Delete').on('click', deleteTownName.bind(town));
                    li.append(btnUpdate);
                    li.append(btnDelete);
                    $('#post-towns').append(li);
                }
            }

            $('#btnAddTown').on('click', addNewTown);
        }
    }

    function addNewTown() {
        let countryName = $('#select-countries option:selected').text();

        $.ajax({
            method: 'GET',
            url: URL + 'countries',
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: handleSuccess
        });

        function handleSuccess(countries) {
            let idTownAdd = '';
            for (let country of countries) {
                if (country['name'] === countryName) {
                    idTownAdd = country._id;
                    break;
                }
            }

            let townNameToAdd = $('#nameFieldTown').val();
            if(townNameToAdd.length > 0) {
                $.ajax({
                    method: 'POST',
                    url: URL + 'towns',
                    data: JSON.stringify({
                        countryId: idTownAdd,
                        townName: townNameToAdd
                    }),
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': authHeaders
                    },
                    success: displayTowns
                });

                function displayTowns(){
                    $('#post-towns').empty();

                    $.ajax({
                        method: 'GET',
                        url: URL + 'towns',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': authHeaders
                        },
                        success: listAllTowns
                    });
                }

                $('#nameFieldTown').val('');
            }
        }
    }

    function updateTownName(ev) {
        let changedTownName = $(ev.target).parent().find('input').val();
        $.ajax({
            method: 'PUT',
            url: URL + 'towns' + '/' + this._id,
            data: JSON.stringify({
                countryId: this.countryId,
                townName: changedTownName
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: listAllTowns
        })
    }

    function deleteTownName() {
        $.ajax({
            method: 'DELETE',
            url: URL + 'towns' + '/' + this._id,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: listAllTowns
        });
    }
}