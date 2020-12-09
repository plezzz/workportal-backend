const unirest = require('unirest')

module.exports = {
    get: {
        all(req, res, next) {
            let year = req.query.year;
            unirest.get(`https://date.nager.at/api/v1/get/bg/${year}`)
                .end(function(resp) {
                    if (resp.error) {
                        console.log('GET error', resp.error)
                        res.status(resp.code)
                        res.send(resp.error)
                    } else {
                        console.log('GET response', resp.body)
                        res.status(200)
                        res.send(resp.body)
                    }
                })
        },
    }
}
