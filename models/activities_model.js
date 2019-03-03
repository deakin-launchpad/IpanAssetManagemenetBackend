var mongoose = require('mongoose');
var schema = mongoose.Schema
// define Schema
var activities_schema = new schema({
    id: String,
    title: String,
    description: String,
    sections: [Object],
});

// compile schema to model
const activitiy_model = mongoose.model('ACTIVITY', activities_schema, 'activity');


module.exports = activitiy_model;