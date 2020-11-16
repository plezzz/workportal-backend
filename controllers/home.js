const titlePage = 'Начало'

module.exports = {
    get: {
        home(req, res) {
            if (req.user) {
                res.render('home/home',{titlePage})
                return
            }
            res.render('user/login')
        }
    }
};
