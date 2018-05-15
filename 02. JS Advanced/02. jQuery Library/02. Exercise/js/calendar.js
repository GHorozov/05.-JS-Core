function calendar(arr) {
    let day= Number(arr[0]);
    let month = Number(arr[1]);
    let year = Number(arr[2]);

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let container = $('#content');

    let table = $('<table>');
    let caption = $('<caption>').text(`${months[month - 1]} ${year}`);
    let tbody = $('<tbody>');
    let trDays = $('<tr>');

    trDays.append(
        $('<th>').text('Mon'),
        $('<th>').text('Tue'),
        $('<th>').text('Wed'),
        $('<th>').text('Thu'),
        $('<th>').text('Fri'),
        $('<th>').text('Sat'),
        $('<th>').text('Sun')
    );

    table.append(caption);
    tbody.append(trDays);

    let count = 1;
    let isStart = false;
    let firstDay = new Date(year, month -1 , 0).getDay()+1;
    let daysInMonth = new Date(year, month, 0).getDate();
    while(true){
        if(count > daysInMonth){
            break;
        }

        let tr = $('<tr>');

        for (let i = 1; i <= 7; i++) {
            let td = $('<td>');

            if(count === day){
                $(td).addClass('today');
            }

            if(Number(firstDay) === i){
                isStart = true;
            }

            if(count <= daysInMonth && isStart){
                td.text(count++)
            }

            $(tr).append(td);
        }

        tbody.append(tr);
    }

    table.append(tbody);
    table.appendTo(container);
}