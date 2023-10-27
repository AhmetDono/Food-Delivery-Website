const {createLogger,transports,format} = require('winston');

//! Logging islemleri
const authLogger = createLogger({
    transports:[
        new transports.File({
            filename:'auth.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'auth-error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),
    ]
})

//! User islemleri
const userLogger = createLogger({
    transports:[
        new transports.File({
            filename:'user.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'user-error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),
    ]
})

//! Food islemleri
const foodLogger = createLogger({
    transports:[
        new transports.File({
            filename:'food.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'food-error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),
    ]
})

//! Food islemleri
const orderLogger = createLogger({
    transports:[
        new transports.File({
            filename:'order.log',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'order-error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),
    ]
})




module.exports = {authLogger,userLogger,foodLogger,orderLogger}