function attachEvents() {
    const username = 'guest';
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    const URL = 'https://baas.kinvey.com/appdata/kid_S15hUzp9z/';
    const headers = {
        'Content-type': 'application/json',
        'Authorization': authHeaders
    };

    loadPlayers();
    function loadPlayers() {
        $.ajax({
            method: 'GET',
            url: URL + 'Players',
            headers: headers,
            success: displayAllPlayers
        });

        function displayAllPlayers(players) {
            $('#players').empty();
            for (const player of players) {
                $('#players')
                    .append($(`<div class="player" data-id="${player._id}">`)
                        .append($('<div class="row">')
                            .append($('<label>Name:</label>'))
                            .append($(`<label class="name">${player.name}</label>`))
                        )
                        .append($('<div class="row">')
                            .append($('<label>Money:</label>'))
                            .append($(`<label class="money">${player.money}</label>`))
                        )
                        .append($('<div class="row">')
                            .append($('<label>Bullets:</label>'))
                            .append($(`<label class="bullets">${player.bullets}</label>`))
                        )
                        .append($('<button class="play">Play</button>').on('click', function () {playAction(player)}))
                        .append($('<button class="delete">Delete</button>').on('click', deleteAction))
                    ).append($('</div>'));


            }
        }
    }

    function playAction(player) {
        console.log(player);
        $('#save').trigger('click');
        $('#canvas').css('display', 'block');
        $('#save').css('display', 'inline-block');
        $('#reload').css('display', 'inline-block');
        loadCanvas(player);
    }

    $('#addPlayer').on('click', addPlayer);

    function addPlayer() {
        $.ajax({
            method: 'POST',
            url: URL + 'Players',
            data: JSON.stringify({
                name: $('#addName').val(),
                money: 500,
                bullets: 6
            }),
            headers: headers,
            success: loadPlayers
        });

        $('#addName').val('');
    }

    function deleteAction() {
        let playerId = $(this).parent().attr('data-id');

        $.ajax({
            method: 'DELETE',
            url: URL + 'Players/'+ playerId,
            headers: headers,
            success: loadPlayers
        })
    }
}
