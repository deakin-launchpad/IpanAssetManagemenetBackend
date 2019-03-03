var mongoose = require('mongoose');
var schema = mongoose.Schema
// define Schema
var program_schema = new schema({
    id: String,
    title: String,
    description: String,
    coverPhoto: String,
    sections: [Object],
    modules: [Number],
});

// compile schema to model
const program_model = mongoose.model('PROGRAM', program_schema, 'programs');


module.exports = program_model;