class PaymentManager{
    constructor(title ){
        this.title = title;
    }

    render(id){
        let table = $('<table>');
        let caption = $(`<caption>${this.title} Payment Manager</caption>`);
        let tHead = $('<thead>');
        let tr = $('<tr>');
        let th1 = $(`<th class="name">Name</th>`);
        let th2 = $(`<th class="category">Category</th>`);
        let th3 = $(`<th class="price">Price</th>`);
        let th4 = $(`<th>Actions</th>`);

        let tBody = $('<tbody class="payments">');

        let tFoot = $('<tfoot class="input-data">');
        let trTFoot = $('<tr>');
        let tdTFoot1 = $('<td><input name="name" type="text"></td>');
        let tdTFoot2 = $('<td><input name="category" type="text"></td>');
        let tdTFoot3 = $('<td><input name="price" type="number"></td>');
        let tdTFoot4 = $('<td><button>Add</button></td></tr>');

        tdTFoot4.on('click', function () {
           let inputName = $('.input-data input[name="name"]').val();
           let inputCategory = $('.input-data input[name="category"]').val();
           let inputPrice = Number($('.input-data input[name="price"]').val());

            if(inputName.length > 0 && typeof inputName === 'string' && inputCategory.length > 0 && typeof inputCategory === 'string' && inputPrice > 0 && typeof inputPrice === 'number'){
                let newRow = $(`<tr><td>${inputName}</td><td>${inputCategory}</td><td>${inputPrice}</td><td><button id="del-btn">Delete</button></td></tr>`);
                $('.payments').append(newRow);
                $('.input-data input[name="name"]').val('');
                $('.input-data input[name="category"]').val('');
                $('.input-data input[name="price"]').val('');
            }
        });

        $(document).on('click', '.payments #del-btn', function(){
            $(this).parent().parent().remove();
        });

        //append all to table
        table.append(
            caption.append(tHead.append(tr
                .append(th1)
                .append(th2)
                .append(th3).append(th4)))
        );

        table.append(tBody);

        table.append(tFoot.append(trTFoot
            .append(tdTFoot1)
            .append(tdTFoot2)
            .append(tdTFoot3)
            .append(tdTFoot4)));

        //append to element with element id === id
        $('#' + id).append(table);
    }
}
