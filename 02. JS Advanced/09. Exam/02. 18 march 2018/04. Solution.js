class PaymentManager {
    constructor(title) {
        this.title = title;
    }

    createElement() {
        let table = $('<table>');
        let caption = $(`<caption>${this.title} Payment Manager</caption>`);
        let tHead = $('<thead>').append($('<tr>')
            .append('<th class="name">Name</th>')
            .append('<th class="category">Category</th>')
            .append('<th class="price">Price</th>')
            .append('<th>Actions</th>')
        );

        let tBody = $('<tbody class="payments">');

        let tFoot = $('<tfoot class="input-data">');
        let rtFoot = $('<tr>');

        let tfName = $('<td><input name="name" type="text"></td>');
        rtFoot.append(tfName);

        let tfCategory = $('<td><input name="category" type="text"></td>');
        rtFoot.append(tfCategory);

        let tfPrice = $('<td><input name="price" type="number"></td>');
        rtFoot.append(tfPrice);

        let ftTd = $('<td>');

        let tfButtonAdd = $('<button>Add</button>').on('click', function(){

            let name = $(tfName.children()[0]).val();
            let category = $(tfCategory.children()[0]).val();
            let price = $(tfPrice.children()[0]).val();

            if (name.length > 0 && category.length > 0 && price.length > 0) {
                let rowToAdd = $('<tr>');
                rowToAdd.append(`<td>${name}</td>`);
                rowToAdd.append(`<td>${category}</td>`);
                rowToAdd.append(`<td>${Number(price)}</td>`);

                let tdDel = $("<td>");
                let delButton = $('<button>Delete</button>').on('click', function () {
                    rowToAdd.remove();
                });

                tdDel.append(delButton);
                rowToAdd.append(tdDel);

                tBody.append(rowToAdd);

                $(tfName.children()[0]).val('');
                $(tfCategory.children()[0]).val('');
                $(tfPrice.children()[0]).val('');
            }

        });

        ftTd.append(tfButtonAdd);
        rtFoot.append(ftTd);
        tFoot.append(rtFoot);

        table.append(caption);
        table.append(tHead);
        table.append(tBody);
        table.append(tFoot);

        return table;
    }

    render(id) {
        let el = this.createElement();

        $(`#${id}`).append(el);
    }
}