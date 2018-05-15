function solution(input) {
    let text = input[0];

    text = text
        .replace(/[.,!?:;]\s*/g, (match) => match.trim() + " ")
        .replace(/\s+[.,!?:;]/g, (match) => match.trim())
        .replace(/\.\s*\.\s*\.\s*!/g,  "...!")
        .replace(/(\.\s+)(\d+)/g, (match, gr1, gr2) => gr1.trim() + gr2)
        .replace(/\"(\s*[^\"]+\s*)\"/g, (match, gr1) => `"${gr1.trim()}"`);

   console.log(text);
}

solution(['Terribly formatted text      .  With chaotic spacings." Terrible quoting   "! Also this date is pretty confusing : 20   .   12.  16 . ']);

//solution(['Make,sure to give:proper spacing where is needed... !']);