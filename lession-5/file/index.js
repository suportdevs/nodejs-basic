const fs = require('fs');

// console.log(fs.writeFileSync('demo.txt','hey this is node'));
// console.log(fs.appendFileSync('demo.txt',' node is osam'));

// const data = fs.readFile('demo.txt', (err, data) => {
//     console.log(data.toString())
//     console.log(err)
// });

// console.log(data)

// fs.appendFile('demo.txt', 'Hello node', function(err){
//     if (err) throw err;
//     console.log("Saved");
// })

fs.rename('demo.txt', function(err){
    if (err) throw err;
    console.log('file deleted.')
})