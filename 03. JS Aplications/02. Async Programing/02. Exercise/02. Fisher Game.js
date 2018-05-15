function attachEvents() {
    const appKey = 'kid_ryocbxYqG';
    const username = 'guest';
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    const URL = `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`;

    $('.load').on('click', loadAllCatches);
    $('.add').on('click', addNewCatches);

    function addNewCatches() {
        let inputAngler = $('#addForm .angler').val();
        let inputWeight = Number($('#addForm .weight').val());
        let inputSpecies = $('#addForm .species').val();
        let inputLocation = $('#addForm .location').val();
        let inputBait = $('#addForm .bait').val();
        let inputCaptureTime = Number($('#addForm .captureTime').val());

        let catchObj = {
            angler: inputAngler,
            weight: inputWeight,
            species: inputSpecies,
            location: inputLocation,
            bait: inputBait,
            captureTime: inputCaptureTime
        };

        $.ajax({
            method: 'POST',
            url: URL,
            data: JSON.stringify(catchObj),
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: loadAllCatches
        });

        //clear forms
        $('#addForm .angler').val('');
        $('#addForm .weight').val('');
        $('#addForm .species').val('');
        $('#addForm .location').val('');
        $('#addForm .bait').val('');
        $('#addForm .captureTime').val('');
    }


    function loadAllCatches() {
        $.ajax({
            method: 'GET',
            url: URL,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: displaySuccess,
        });

        function displaySuccess(data) {
            let container = $('#main');
            let catchDiv = $('<div id="catches">');
            for (const element of data) {
                catchDiv
                    .append($(`<div class="catch">`).attr('data-id', element._id)
                        .append($(`<label>Angler</label>`))
                        .append($(`<input type="text" class="angler" value="${element.angler}"/>`))
                        .append($(`<label>Weight</label>`))
                        .append($(`<input type="number" class="weight" value="${element.weight}"/>`))
                        .append($(`<label>Species</label>`))
                        .append($(`<input type="text" class="species" value="${element.species}"/>`))
                        .append($(`<label>Location</label>`))
                        .append($(`<input type="text" class="location" value="${element.location}"/>`))
                        .append($(`<label>Bait</label>`))
                        .append($(`<input type="text" class="bait" value="${element.bait}"/>`))
                        .append($(`<label>Capture Time</label>`))
                        .append($(`<input type="number" class="captureTime" value="${element.captureTime}"/>`))
                        .append($(`<button class="update">Update</button>`).on('click', updateForm.bind(element)))
                        .append($(`<button class="delete">Delete</button>`).on('click', deleteForm.bind(element)))
                    );
            }
            $('#main').empty();
            container.append($('<legend>Catches</legend>'));
            container.append(catchDiv);

            function updateForm(ev) {
                let objId = this._id;

                //test second way --------------------------
                //let inputs = $(ev.target).parent().find('input'); //take all inputs
                //let inputAngler = $(inputs[0]).val(); //take anglerValue same gor others element values
                //---------------------------------------------

                let objData = {};
                $(ev.target).parent().find('input').each((index, el) => {
                    if (el.type === 'text') {
                        objData[el.className] = el.value;
                    } else {
                        objData[el.className] = Number(el.value);
                    }
                });

                $.ajax({
                    method: 'PUT',
                    url: URL + '/' + `${objId}`,
                    data: JSON.stringify(objData),
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': authHeaders
                    },
                    success: loadAllCatches
                });
            }

            function deleteForm() {
                let objId = this._id;
                $.ajax({
                    method: 'DELETE',
                    url: URL + '/' + `${objId}`,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': authHeaders
                    },
                    success: loadAllCatches
                });
            }
        }
    }
}