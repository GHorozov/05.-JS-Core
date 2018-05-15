function addItem(){
    let textBox = document.getElementById('newItemText').value;
    let valueBox = document.getElementById('newItemValue').value;

    let select = document.getElementById('menu');
    let option = document.createElement('option');
    option.value = valueBox;
    option.text = textBox;
    select.appendChild(option);
    document.getElementById('newItemText').value = '';
    document.getElementById('newItemValue').value = '';
}