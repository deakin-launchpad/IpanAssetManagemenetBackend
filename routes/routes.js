const dbhelper = require('../dbHelper')
const route = require('express').Router();
const uuid = require('uuid')
route.get('/api/programs', async (request, response) => {
    console.log('{GET}')
    var result = [];
    var promise = new Promise(async (reject, resolve) => {
        await dbhelper.getPrograms(function (response) {
            result = response
            console.log('[RESULT] : ', result);
            if (result.statusCode === 201) {
                resolve(result);
            }
            else {
                reject(result)
            }
        });
    })

    promise.then(result => {

        response.send(result).status(200);
    })
        .catch(result => {
            response.send(result).status(400);
        })
}
)

route.post('/api/program', async (request, response) => {
    var result;
    var statusCode;
    console.log('[REQUEST] :', JSON.stringify(request.body))
    var data = {
        id: 0,
        title: '',
        description: '',
        coverPhoto: '',
        sections: [{
            type: '',
            value: ''
        }],
        modules: [],
        modulesMap: []
    }
    data.id = uuid.v1();
    data.title = request.body.title;
    data.description = request.body.description;
    data.coverPhoto = request.body.coverPhoto;
    data.sections = request.body.sections;
    data.modules = request.body.modules;
    data.modulesMap = request.body.modulesMap
    var promise = new Promise((reject, resolve) => {
        dbhelper.insertProgramInDb(data, function (response) {
            result = response
            console.log('[RESULT] : ', JSON.stringify(result));
            if (result.statusCode === 201) {
                resolve(result);
            }
            else {
                reject(result)
            }
        });
    })

    promise.then(result => {
        response.send(result).status(200);
    })
        .catch(result => {
            response.send(result).status(400);
        })
}
)

route.get('/api/modules', async (request, response) => {
    console.log('{GET}')
    var result = [];
    var promise = new Promise(async (reject, resolve) => {
        await dbhelper.getModules(function (response) {
            result = response
            console.log('[RESULT] : ', result);
            if (result.statusCode === 201) {
                resolve(result);
            }
            else {
                reject(result)
            }
        });
    })

    promise.then(result => {

        response.send(result).status(200);
    })
        .catch(result => {
            response.send(result).status(400);
        })
}
)

route.post('/api/modules', async (request, response) => {
    var result;
    var statusCode;
    var data = {
        id: '',
        title: '',
        description: '',
        coverPhoto: '',
        sections: [{
            type: '',
            data: { value: '' }
        }],
        modules: [],
        tasks: [],
        activities: [],
        goals: [],
        refreshers: [],
        pills: [],
        resources: {
            title: '',
            shortDescription: ''
        }
    }
    data.id = uuid.v1();
    data.title = request.body.title;
    data.description = request.body.description;
    data.coverPhoto = request.body.coverPhoto;
    data.sections = request.body.sections;
    data.modules = request.body.modules;
    data.tasks = request.body.tasks;
    data.activities = request.body.activities;
    data.goals = request.body.goals;
    data.refreshers = request.body.refreshers;
    data.pills = request.body.pills;
    data.resources = request.body.resources;
    console.log('[REQUEST] :', JSON.stringify(data))
    var promise = new Promise((reject, resolve) => {
        dbhelper.insertModuleToDb(data, function (response) {
            result = response
            if (result.statusCode === 201) {
                console.log('[Status Code] : ', result.statusCode);
                resolve(result);
            }
            else {
                reject(result)
            }
        });
    })

    promise.then(result => {
        response.send(result).status(result.statusCode);
    })
        .catch(result => {
            response.send(result).status(result.statusCode);
        })
}
)


route.get('/api/activity', async (request, response) => {
    console.log('{GET}')
    var result = [];
    var promise = new Promise(async (reject, resolve) => {
        await dbhelper.getActivity(function (response) {
            result = response
            console.log('[RESULT] : ', result);
            if (result.statusCode === 201) {
                resolve(result);
            }
            else {
                reject(result)
            }
        });
    })

    promise.then(result => {

        response.send(result).status(200);
    })
        .catch(result => {
            response.send(result).status(400);
        })
}
)
route.post('/api/activity', async (request, response) => {
    var result;
    var statusCode;
    console.log('[REQUEST] :', JSON.stringify(request.body))
    var data = {
        id: 0,
        title: '',
        description: '',
        sections: [{
            type: '',
            value: ''
        }],
    }
    data.id = uuid.v1();
    data.title = request.body.title;
    data.description = request.body.description;
    data.sections = request.body.sections;
    var promise = new Promise((reject, resolve) => {
        dbhelper.insertActivityToDb(data, function (response) {
            result = response
            console.log('[RESULT] : ', JSON.stringify(result));
            if (result.statusCode === 201) {
                resolve(result);
            }
            else {
                reject(result)
            }
        });
    })

    promise.then(result => {
        response.send(result).status(200);
    })
        .catch(result => {
            response.send(result).status(400);
        })
}
)
module.exports = route