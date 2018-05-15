function restaurantBill(arr) {
    let products = arr.filter((a, i) =>  i %2 == 0).join(', ');
    let price = arr.filter((a, i) =>  i % 2 == 1).map(x => Number(x)).reduce((a,b) => a+b);

    console.log(`You purchased ${products} for a total sum of ${price}`);
}

restaurantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);