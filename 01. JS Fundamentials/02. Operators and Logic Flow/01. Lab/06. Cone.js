function calcCone(r, h) {
    //Volume of a cone:
       // V = (1/3)πr2h
   // Slant height of a cone:
       // s = √(r2 + h2)
   //Lateral surface area of a cone:
       // L = πrs = πr√(r2 + h2)
    //Base surface area of a cone (a circle):
       // B = πr2
    //Total surface area of a cone:
       // A = L + B = πrs + πr2 = πr(s + r) = πr(r + √(r2 + h2))

    let volume = (1/3 )* Math.PI * (r**2) * h ;

    let s = Math.sqrt((r**2) * (h**2));
    let L = Math.PI * r * Math.sqrt((r**2) + (h**2));
    let B = Math.PI * (r**2);

    let area = L + B;

    console.log(volume);
    console.log(area);
}

calcCone(3, 5);