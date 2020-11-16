const {CategoryKnowledge} = require('../models');
const {errorCommon} = require('../config/messages');

module.exports = {
    get: {
        all(req, res, next) {
            CategoryKnowledge
                .find({isDisabled: false})
                .populate('listKnowledge')
                .populate('listTags')
                .lean()
                .then(categories => {
                    res.render('categoryKnowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            CategoryKnowledge
                .findOne({_id:req.params.id})
                .populate('listKnowledge')
                .populate('listTags')
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
            CategoryKnowledge
                .findOne({_id:req.params.id})
                .populate('Knowledge')
                .populate('Tag')
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

            CategoryKnowledge.create({title, description, imageURL, createdBy})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title, description, imageURL} = req.body;

            CategoryKnowledge
                .updateOne({_id: id}, {title, description, imageURL,editedBy},
                    {runValidators: true}, function (err) {
                        if (err) {
                            if (err.code === 11000) {
                                next(errorCommon.alreadyInUseObj('CategoryKnowledge','title'));
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
            CategoryKnowledge
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
};
