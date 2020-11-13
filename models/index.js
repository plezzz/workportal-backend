const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getCategoryKnowledgeModel = require('./CategoryKnowledge');
const getCategoryThermModel = require('./CategoryTherm');
const getJobModel = require('./Job');
const getKnowledgeModel = require('./Knowledge');
const getTagModel = require('./Tag');
const getThermModel = require('./Therm');
const getVacationModel = require('./Vacation');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    CategoryKnowledge: getCategoryKnowledgeModel(mongoose),
    CategoryTherm: getCategoryThermModel(mongoose),
    Job: getJobModel(mongoose),
    Knowledge: getKnowledgeModel(mongoose),
    Tag: getTagModel(mongoose),
    Therm: getThermModel(mongoose),
    Vacation: getVacationModel(mongoose)
};
