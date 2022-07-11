const EventEmitter = require('events');

class School extends EventEmitter{

    initPeriod (){
    
        this.emit('ballRings', {
            period: 'morging',
            at: '9:00pm'
        })
    }
}

module.exports = School;