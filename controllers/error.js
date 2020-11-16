module.exports = {
    get: {
        displayError(req, res) {
            console.log(req.originalUrl)
            const url = req.url;
            res.render('error/not-found', {url})
        }
    }
};
