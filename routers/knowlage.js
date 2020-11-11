const {checkAuth} = require("../utils");
const {knowledge} = require('../controllers');


module.exports = (router) => {
    router.get("/allQuestions", checkAuth(true),knowledge.get.all)
    router.get('/create', checkAuth(true), knowledge.get.create);
    router.get('/details/:courseId', checkAuth(true), knowledge.get.details);
    router.get('/edit/:courseId', checkAuth(true), knowledge.get.edit);
    router.get('/delete/:courseId', checkAuth(true), knowledge.get.delete);
    router.get('/enroll/:courseId', checkAuth(true), knowledge.get.enroll);

    router.post('/create', checkAuth(true), knowledge.post.create);
    router.post('/edit/:courseId', checkAuth(true), knowledge.post.edit)


    return router
}
