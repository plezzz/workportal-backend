const titlePage = 'Начало'

module.exports = {
    get: {
        home(req, res) {
            res.render('home/api',{titlePage})
            // if (req.user) {
            //     res.render('home/home',{titlePage})
            //     return
            // }
            // res.render('user/login')
        }
    }
};
