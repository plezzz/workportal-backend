const {Term, CategoryTerm, User} = require('../models');
const {errorCommon} = require('../config/messages');

module.exports = {
    get: {
        all(req, res, next) {
            Term
                .find({isDisabled: false, isDeleted: false})
                .populate('category')
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(categories => {
                    res.render('knowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            Term
                .findOne({_id: req.params.id})
                .populate('category')
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(category => {
                    res.render('knowledge/details', {category})
                })
                .catch(next)
        },
        update(req, res, next) {
            Term
                .findOne({_id: req.params.id})
                .populate('category')
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(category => {
                    res.render('knowledge/update', {category})
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {title, description, image, category} = req.body;

            Term
                .create({title, description, image, category, createdBy})
                .then(term => {
                    Promise.all([
                        CategoryTerm.updateOne({_id: category,}, {
                            $push: {listTerms: term._id},
                            $inc: {count: 1}
                        }),
                        User.updateOne({_id: createdBy}, {$push: {listTerms: term._id}})
                    ])
                    return term
                })
                .then(term => {
                    res.send(term)
                    //res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title, description, image, category} = req.body;
            Term
                .updateOne({_id: id}, {title, description, image, category, editedBy},
                    {runValidators: true}, function (err) {
                        if (err) {
                            if (err.code === 11000) {
                                next(errorCommon.alreadyInUseObj('CategoryKnowledge', 'title'));
                            }
                        }
                    }
                )
                .then(data => {
                    res.status(204);
                    res.send(data);
                })
                .catch(next)
        }
        ,
        delete(req, res, next) {
            const id = req.params.id;
            const userID = req.user._id;

            Term.findOneAndUpdate({_id: id}, {isDeleted: true},)
                .then(data => {
                    return data.category
                })
                .then(categoryID => {
                    Promise.all([
                        CategoryTerm.updateOne({_id: categoryID,}, {
                            $pullAll: {listTerms: [id],},
                            $inc: {count: -1}
                        }),
                        User.updateOne({_id: userID}, {$pullAll: {listTerms: [id]}})
                    ])
                })
                .catch(next)
        }
    }
}
