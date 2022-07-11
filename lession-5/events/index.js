// const EventEmitter = require('events');
// const fs = require('fs');
const School = require('./school');
const school = new School();

// const rs = fs.createReadStream("./demo.txt");

// rs.on('open', function(){
//     console.log('This file is open.');
// })

// const eventHandler = () => {
//     console.log('i am hear a event stream');
// }

// eventEmitter.on('stream', eventHandler);

// eventEmitter.emit('open');

// function startPeriod(){
    school.on('ballRings', function({period, at}){
        console.log('Class started');
    
        setTimeout(() => {
            console.log(`when ball is ringing and ${period} start at ${at}`)
        }, 1000)
    })
// }

school.initPeriod()