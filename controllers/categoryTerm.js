const {CategoryTerm} = require('../models');
const {errorCommon} = require('../config/messages');

module.exports = {
    get: {
        all(req, res, next) {
            CategoryTerm
                .find({isDisabled: false})
                .populate('listTerms')
                .lean()
                .then(categories => {
                    res.render('categoryKnowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            CategoryTerm
                .findOne({_id:req.params.id})
                .populate('listTerms')
                .lean()
                .then(category => {
                    res.render('categoryKnowledge/details', {category})
                })
                .catch(next)
        },
        create(req, res) {
            res.render('categoryKnowledge/create')
        },
        update(req, res, next) {
            CategoryTerm
                .findOne({_id:req.params.id})
                .populate('listTerms')
                .lean()
                .then(category => {
                    res.render('categoryKnowledge/update', {category})
                })
                .catch(next)
        },
    },

    post: {
        create: function (req, res, next) {
            const createdBy = req.user._id;
            let {title, description, imageURL} = req.body;

            CategoryTerm.create({title, description, imageURL, createdBy})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title, description, imageURL} = req.body;

            CategoryTerm
                .updateOne({_id: id}, {title, description, imageURL,editedBy},
                    {runValidators: true}, function (err) {
                        if (err) {
                            if (err.code === 11000) {
                                next(errorCommon.alreadyInUseObj('CategoryTerms','title'));
                            }
                        }
                    }
                )
                .then(() => {
                    res.status(204);
                    res.redirect(`/categoryKnowledge/details/${id}`)
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.id;
            CategoryTerm
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
};
