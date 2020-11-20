const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getCategoryKnowledgeModel = require('./CategoryKnowledge');
const getCategoryTermModel = require('./CategoryTerm');
const getJobModel = require('./Job');
const getKnowledgeModel = require('./Knowledge');
const getTagModel = require('./Tag');
const getTermModel = require('./Term');
const getVacationModel = require('./Vacation');
const getMessageModel = require('./Message');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    CategoryKnowledge: getCategoryKnowledgeModel(mongoose),
    CategoryTherm: getCategoryTermModel(mongoose),
    Job: getJobModel(mongoose),
    Knowledge: getKnowledgeModel(mongoose),
    Tag: getTagModel(mongoose),
    Therm: getTermModel(mongoose),
    Vacation: getVacationModel(mongoose),
    Messages: getMessageModel(mongoose)
};
