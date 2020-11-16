const {Tag} = require('../models')
module.exports = async (tags) => {

    let newTags = [];
    for (const tag of tags) {
        const newTag = await tagChecker(tag);
        newTags.push(newTag);
    }
    return newTags
}

function tagChecker(title) {
    return new Promise((resolve) => {
        Tag
            .findOneAndUpdate({title: title}, {$inc: {count: 1}}, {new: true, upsert: true})
            .then((data) => {
                resolve(data._id);
            });
    })
}
