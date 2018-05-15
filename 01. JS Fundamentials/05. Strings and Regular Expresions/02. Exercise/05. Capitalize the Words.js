function capitalizeTheWords(str) {
  // let words =str.split(' ');
  //
  // let result = [];
  //   for (let w of words) {
  //       let firstLetter = w[0].toUpperCase();
  //       let lastword = w.substr(1).toLowerCase();
  //
  //       let currentWord = firstLetter+lastword;
  //       result.push(currentWord);
  //   }

    //second way
    str = str.replace(/\b\w+\b/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());

    console.log(str);
}

capitalizeTheWords('Capitalize these words');

capitalizeTheWords('Was that Easy? tRY thIs onE for SiZe!');