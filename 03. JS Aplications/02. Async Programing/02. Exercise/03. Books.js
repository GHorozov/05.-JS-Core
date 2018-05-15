function attachEvents() {
    const appKey = 'kid_SJZaisKcM';
    const username = 'guest';
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    const URL = `https://baas.kinvey.com/appdata/${appKey}/books`;


    $('#submitNewBook').on('click', addNewBook);
    $('#listAllBooks').on('click', listAllBooks);

    function addNewBook() {
        let inputTitle = $('#inputTitle').val();
        let inputAuthor = $('#inputAuthor').val();
        let inputISBN = $('#inputISBN').val();

        let objData ={
          title: inputTitle,
          author: inputAuthor,
          isbn: inputISBN
        };

        $.ajax({
            method: 'POST',
            url: URL,
            data: JSON.stringify(objData),
            headers:{
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: listAllBooks
        });


        $('#inputTitle').val('');
        $('#inputAuthor').val('');
        $('#inputISBN').val('');
    }

    function listAllBooks() {
        $('#bookList').empty();
        $.ajax({
            method: 'GET',
            url: URL,
            headers:{
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: displayBooks
        });

        function displayBooks(res) {
            for (const book of res) {
                let li = $(`<li>`);
                li.append($(`<label>Title</label>`))
                    .append($(`<input type="text" value="${book.title}"/>`));

                li.append($(`<label>Author</label>`))
                    .append($(`<input type="text" value="${book.author}"/>`));

                li.append($(`<label>isbn</label>`))
                    .append($(`<input type="text" value="${book.isbn}"/>`));

                let btnUpdate = $('<button id="update">Update</button>').on('click', updateRow.bind(book));
                let btnDelete = $('<button id="delete">Delete</button>').on('click', deleteRow.bind(book));
                li.append(btnUpdate);
                li.append(btnDelete);
                $('#bookList').append(li);
            }
        }

        function updateRow(ev) {
            let inputs = $(ev.target).parent().find('input');

            let objData = {
                title: $(inputs[0]).val(),
                author: $(inputs[1]).val(),
                isbn: $(inputs[2]).val()
            };

            $.ajax({
                method: 'PUT',
                url: URL + '/' + this._id,
                data: JSON.stringify(objData),
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': authHeaders
                },
                success: listAllBooks
            });
        }

        function deleteRow() {
            $.ajax({
                method: 'DELETE',
                url: URL + '/' + this._id,
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': authHeaders
                },
                success: listAllBooks
            });
        }
    }
}