let receiptService = (() => {

    function getActive() {
        let userId = sessionStorage.getItem("userId");
        return remote.get('appdata', `receipts?query={"_acl.creator": "${userId}","active": "true"}`, 'Kinvey');
    }
    function getEntries(receiptId) {
        return remote.get('appdata', `entries?query={"receiptId": "${receiptId}"}`, 'Kinvey');
    }

    function createReceipt() {
        let data = {
            "active": true,
            "productCount": 0,
            "total": 0
        };

        return remote.post('appdata', 'receipts', 'Kinvey', data);
    }

    function addProduct(type, qty, price, receiptId) {
        let data ={
            type,
            qty,
            price,
            receiptId
        };

        return remote.post('appdata', 'entries', 'Kinvey', data);
    }

    function deleteProduct(productId) {
        return remote.remove('appdata', 'entries/' + productId, 'Kinvey');
    }

    function checkoutReceipt(receiptId, productCount, total) {
        let data = {
            active: false,
            productCount: productCount,
            total : total
        };
        return remote.update('appdata', 'receipts/' + receiptId, 'Kinvey', data);
    }

    function getAllReceipts(userId) {
        return remote.get('appdata', `receipts?query={"_acl.creator":"${userId}","active":"false"}`, 'Kinvey')
    }

    return {
        getActive,
        getEntries,
        createReceipt,
        addProduct,
        deleteProduct,
        checkoutReceipt,
        getAllReceipts,
    };
})();