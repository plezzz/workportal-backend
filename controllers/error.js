module.exports = {
    get: {
        displayError(req, res) {
            const url = req.url;
            res.send({
                url: url,
                message: 'Not Found'
            });
        }
    }
};
