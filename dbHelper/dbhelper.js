const mongoose = require('mongoose');
const config = require('../Config');
const models = require('../models')
mongoose.Promise = global.Promise;

const openConnection = function () {
    var db = mongoose.connection;

    mongoose.connect(config.APP_CONSTANTS.DATABASE.DB_URL, { useNewUrlParser: true });
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log("Connection Successful!");
    });
}

const insertProgramInDb = async function (data, callback) {
    var result;
    const programModel = models.programModel;
    var program = new programModel({
        id: data.id,
        title: data.title,
        description: data.description,
        coverPhoto: data.coverPhoto,
        sections: data.sections,
        modules: data.modules,
        modulesMap: data.modulesMap
    });

    await program.save(function (err) {
        if (err) {
            result = config.APP_CONSTANTS.STATUS_MSG.ERROR.DEFAULT;
        }
        else {
            result = config.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED;
        }
        //console.log('[DB RESPONSE] : ', JSON.stringify(result));
        callback(result)
    });

}

const getPrograms = function (callback) {
    //console.log('[PROGRAMS]')
    const programModel = models.programModel;
    programModel.find({}).then(res => {
        var programs = [];
        for (i = 0; i < res.length; i++)
            programs[i] = res[i]
        callback(programs)
    })
        .catch(err => {
            var programs;
            programs = err;
            callback(programs)
        });

}

const getModules = function (callback) {
    //console.log('[PROGRAMS]')
    const moduleModel = models.moduleModel;
    moduleModel.find({}).then(res => {
        var modules = [];
        console.log('[DB RESPONSE]', res[0])
        for (i = 0; i < res.length; i++)
            modules[i] = res[i]
        callback(modules)
    })
        .catch(err => {
            var modules;
            modules = err;
            callback(modules)
        });

}

const insertModuleToDb = async function (data, callback) {
    var result;
    const moduleModel = models.moduleModel;
    console.log('[DB insert] : ', JSON.stringify(data));
    var module = new moduleModel({
        id: data.id,
        title: data.title,
        description: data.description,
        coverPhoto: data.coverPhoto,
        sections: data.sections,
        modules: data.modules,
        tasks: data.tasks,
        activities: data.activities,
        goals: data.goals,
        refreshers: data.refreshers,
        pills: data.pills,
        resources: {
            title: data.resources.title,
            shortDescription: data.resources.shortDescription
        }
    });

    await module.save(function (err) {
        if (err) {
            console.log('[ERROR]' + err)
            result = config.APP_CONSTANTS.STATUS_MSG.ERROR.DEFAULT;
        }
        else {
            result = config.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED;
        }
        //console.log('[DB RESPONSE] : ', JSON.stringify(result));
        callback(result)
    });

}

const getActivity = function (callback) {
    //console.log('[PROGRAMS]')
    const activityModel = models.activityModel;
    activityModel.find({}).then(res => {
        var activities = [];
        for (i = 0; i < res.length; i++)
            activities[i] = res[i]
        callback(activities)
    })
        .catch(err => {
            var activities;
            activities = err;
            callback(activities)
        });

}

const insertActivityToDb = async function (data, callback) {
    var result;
    const activityModel = models.activityModel;
    var activity = new activityModel({
        id: data.id,
        title: data.title,
        description: data.description,
        sections: data.sections,
    });

    await activity.save(function (err) {
        if (err) {
            result = config.APP_CONSTANTS.STATUS_MSG.ERROR.DEFAULT;
        }
        else {
            result = config.APP_CONSTANTS.STATUS_MSG.SUCCESS.CREATED;
        }
        //console.log('[DB RESPONSE] : ', JSON.stringify(result));
        callback(result)
    });

}

var dbHelper = {
    openConnection: openConnection,
    insertProgramInDb: insertProgramInDb,
    getPrograms: getPrograms,
    getModules: getModules,
    insertModuleToDb: insertModuleToDb,
    getActivity: getActivity,
    insertActivityToDb: insertActivityToDb
}

module.exports = dbHelper;