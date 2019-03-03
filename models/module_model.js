var mongoose = require('mongoose');
var schema = mongoose.Schema
// define Schema
var module_schema = new schema({
    id: String,
    title: String,
    description: String,
    coverPhoto: String,
    sections: [Object],
    modules: [Number],
    tasks: [Number],
    activities: [Number],
    goals: [],
    refreshers: [],
    pills: [],
    resources: {
        title: String,
        shortDescription: String
    }
});

// compile schema to model
const module_model = mongoose.model('MODULE', module_schema, 'modules');


module.exports = module_model;