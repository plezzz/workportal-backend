const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getCategoryModel = require('./Category');
const getJobModel = require('./Job');
const getKnowledgeModel = require('./Knowledge');
const getTagModel = require('./Tags');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Category: getCategoryModel(mongoose),
    Job: getJobModel(mongoose),
    Knowledge: getKnowledgeModel(mongoose),
    Tag: getTagModel(mongoose),
};
