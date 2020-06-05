let url = "";

if (process.env.NODE_ENV == 'development') {
    url = 'http://webapi.elvbus.cn';
}else if (process.env.NODE_ENV == 'production') {
    url = 'http://www5.elvbus.cn';
}

module.exports = url