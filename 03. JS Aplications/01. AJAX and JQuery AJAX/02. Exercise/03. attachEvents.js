function attachEvents() {
    let URL = 'https://messenger-d5e7f.firebaseio.com/messenger/.json';

    $('#submit').on('click', function () {
        let author = $('#author').val();
        let content = $('#content').val();
        let timeStamp = Date.now();
        let postContent = JSON.stringify({
            author,
            content,
            timeStamp
        });

        $.post(URL, postContent)
            .then(refresh);
    });

    $('#refresh').on('click', refresh);

    function refresh() {
        $.get(URL)
            .then(loadData);
    }

    function loadData(data) {
        $('#messages').empty();
        let container = $('#messages');
        for (let key in data) {
            const message = data[key];
            let currentMessage = `${message.author}: ${message.content}\n`;
            container.append(currentMessage);
        }
    }
}