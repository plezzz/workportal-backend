const {Knowledge, CategoryKnowledge, User} = require('../models');
const {errorCommon} = require('../config/messages');
const {tagsCheck} = require('../utils');

module.exports = {
    get: {
        all(req, res, next) {
            Knowledge
                .find({isDisabled: false})
                .populate('tags')
                .populate('category')
                .populate('createdBy')
                .populate('editedBy')
                .lean()
                .then(categories => {
                    res.render('knowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            Knowledge
                .findOne({_id: req.params.id})
                .populate('tags')
                .populate('category')
                .populate('createdBy')
                .populate('editedBy')
                .lean()
                .then(category => {
                    res.render('knowledge/details', {category})
                })
                .catch(next)
        },
        create(req, res) {
            res.render('knowledge/create')
        },
        update(req, res, next) {
            Knowledge
                .findOne({_id: req.params.id})
                .populate('tags')
                .populate('category')
                .populate('createdBy')
                .populate('editedBy')
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
            let {title, description, imageURL, category, tags} = req.body;
            tags = await tagsCheck(tags)
            Knowledge
                .create({title, description, imageURL, category, tags, createdBy})
                .then((knowledge) => {
                    Promise.all([
                        CategoryKnowledge.updateOne({_id: category,}, {
                            $push: {listKnowledge: knowledge._id, listTags: {$each: tags}},
                            $inc: {count: 1}
                        }),
                        User.updateOne({_id: createdBy}, {$push: {listKnowledge: knowledge._id}})
                    ])
                    return knowledge
                })
                .then(knowledge => {
                    res.send(knowledge)
                    //res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title, description, imageURL, category, tags} = req.body;
            tags = tagsCheck(tags)
            Knowledge
                .updateOne({_id: id}, {title, description, imageURL, category, tags, editedBy},
                    {runValidators: true}, function (err) {
                        if (err) {
                            if (err.code === 11000) {
                                next(errorCommon.alreadyInUseObj('CategoryKnowledge', 'title'));
                            }
                        }
                    }
                )
                .then(() => {
                    res.status(204);
                    res.redirect(`/knowledge/details/${id}`)
                })
                .catch(next)
        }
        ,
        delete(req, res, next) {
            let id = req.params.id;
            Knowledge
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
}
