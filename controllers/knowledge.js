const {Knowledge, CategoryKnowledge, User} = require('../models');
const {errorCommon} = require('../config/messages');
const {tagsCheck} = require('../utils');

module.exports = {
    get: {
        all(req, res, next) {
            Knowledge
                .find({isDisabled: false,isDeleted:false})
                .populate('tags')
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
            Knowledge
                .findOne({_id: req.params.id})
                .populate('tags')
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
            Knowledge
                .findOne({_id: req.params.id})
                .populate('tags')
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
            let {title, description, image, category, tags} = req.body;
            tags = await tagsCheck(tags)
            Knowledge
                .create({title, description, image, category, tags, createdBy})
                .then(knowledge => {
                    Promise.all([
                        CategoryKnowledge.updateOne({_id: category,}, {
                            $push: {listKnowledge: knowledge._id},
                            $addToSet: {listTags: tags},
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
            let {title, description, image, category, tags} = req.body;
            tags = tagsCheck(tags)
            Knowledge
                .updateOne({_id: id}, {title, description, image, category, tags, editedBy},
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

            Knowledge
                .findOneAndUpdate({_id: id}, {isDeleted: true},)
                .then(data => {
                    return data.category
                })
                .then(categoryID => {
                  return  Promise.all([
                        CategoryKnowledge.updateOne({_id: categoryID,}, {
                            $pullAll: {listKnowledge: [id],},
                            $inc: {count: -1}
                        }),
                        User.updateOne({_id: userID}, {$pullAll: {listKnowledge: [id]}})
                    ])
                })
                .then(()=>{
                    res.status(201)
                    res.send({message: 'Success'})
                })
                .catch(next)
        }
    }
}
