const {Knowledge, User} = require('../models');

module.exports = {
    get: {
        all(req, res) {
            Knowledge({})
                .populate('Knowledge')
                .populate('Tag')
                .lean()
                .then(allKnowledge => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(allKnowledge));
                })
        },
        details(req, res, next) {
        },
        create(req, res) {
        },
        update(req, res, next) {
        },
        delete(req, res, next) {
        },
    },

    post: {
        create: function (req, res, next) {
        },
        update(req, res, next) {
        },
        delete(req, res, next) {
        }
    }
};
