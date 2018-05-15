function attachEvents() {
    const username = 'guest';
    const password = 'pass';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    //const URL = `https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/`;

    $('#getVenues').on('click', takeVenuesIds);

    function takeVenuesIds() {
        let dateValue = $('#venueDate').val();
        $.ajax({
            method: 'POST',
            url: 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=' + dateValue,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: handleSuccess,
            error: handleError
        });

        function handleSuccess(ids) {
            if (!ids) {
                $('#venue-info').append('There are no id\'s!');
                return
            }

            for (const id of ids) {
                $.ajax({
                    method: 'GET',
                    url: 'https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/' + id,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': authHeaders
                    },
                    success: displayVenue
                });

                function displayVenue(venue) {
                    $('#venue-info')
                        .append($('<div>').addClass("venue").attr('id', venue._id)
                            .append($('<span>').addClass("venue-name").text(venue.name + ' ')
                                .append($('<input>').addClass("info").attr("type", "button").val("More info").on('click', moreInfoAction)))
                            .append($('<div>').addClass("venue-details").css("display", "none")
                                .append($('<table>')
                                    .append($('<tr>')
                                        .append($('<th>').text("Ticket Price"))
                                        .append($('<th>').text("Quantity"))
                                        .append($('<th>')))
                                    .append($('<tr>')
                                        .append($('<td>').addClass("venue-price").text(`${venue.price} lv`))
                                        .append($('<td>')
                                            .append($('<select>').addClass("quantity")
                                                .append($('<option>').val("1").text("1"))
                                                .append($('<option>').val("2").text("2"))
                                                .append($('<option>').val("3").text("3"))
                                                .append($('<option>').val("4").text("4"))
                                                .append($('<option>').val("5").text("5"))))
                                        .append($('<td>')
                                            .append($('<input>').addClass("purchase").attr("type", "button").val("Purchase").on('click', perchaseTicket)))))
                                .append($('<span>').addClass("head").text("Venue description:"))
                                .append($('<p>').addClass("description").text(venue.description))
                                .append($('<p>').addClass("description").text(`Starting time: ${venue.startingHour}`))
                            )
                        );

                    function moreInfoAction() {
                        let elementStyle = $('.venue-details').css( "display" );
                        if (elementStyle !== "none") {
                            $('.venue-details').hide();
                        } else {
                            $(this).parent().parent().find('.venue-details').show();
                        }
                    }

                    function perchaseTicket() {
                        $('#venue-info').empty();
                        let id = $(this).parent().parent().parent().parent().parent().attr('id');
                        let name = $(this).parent().parent().parent().parent().parent().find(".venue-name").text();
                        let qty = Number($(this).parent().parent().find(".quantity").val());
                        let price = Number($(this).parent().parent().find(".venue-price").text()
                                        .substring(0, $(this).parent().parent().find(".venue-price").text().length-2));

                        $('#venue-info')
                            .html(`<span class="head">Confirm purchase:</span>
<div class="purchase-info">
  <span>${name}</span>
  <span>${qty} x ${price}</span>
  <span>Total: ${qty * price} lv</span>
  <input type="button" value="Confirm">
</div>
`);


                        $('.purchase-info input').on('click', confirmAction);

                        function confirmAction() {
                            $.ajax({
                                method: 'Post',
                                url: 'https://baas.kinvey.com/' + 'rpc/kid_BJ_Ke8hZg/custom/purchase?venue='+ id + '&qty=' + qty,
                                headers: {
                                    'Content-type': 'application/json',
                                    'Authorization': authHeaders
                                },
                                success: finalConfirmPage
                            });

                            function finalConfirmPage(res){
                                $('#venue-info').empty();
                                $('#venue-info').html('You may print this page as your ticket' + res.html);
                            }
                        }
                    }
                }
            }
        }

        function handleError(err) {
            $('#venue-info').append('Error:' + ' ' + err.statusText);
        }
    }

}