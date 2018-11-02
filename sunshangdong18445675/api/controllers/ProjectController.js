/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // action - create
create: async function (req, res) {

    if (req.method == "GET")
        return res.view('project/create');

    if (typeof req.body.Project === "undefined")
        return res.badRequest("Form-data not received.");

    await Project.create(req.body.Project);

    return res.ok("Successfully created!");
},

// action - index
index: async function (req, res) {

    var models = await Project.find();
    return res.view('project/index', { projects: models });
    
},

// action - admin
admin: async function (req, res) {

    var models = await Project.find();
    return res.view('project/admin', { projects: models });
    
},

// action - admin
details: async function (req, res) {

    var models = await Project.find();
    return res.view('project/details', { projects: models });
    
},

// action - view
view: async function (req, res) {

    var message = Project.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var model = await Project.findOne(req.params.id);

    if (!model) return res.notFound();

    return res.view('project/view', { project: model });

},

// action - delete 
delete: async function (req, res) {

    if (req.method == "GET") return res.forbidden();

    var message = Project.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    var models = await Project.destroy(req.params.id).fetch();

    if (models.length == 0) return res.notFound();

    return res.ok("Project Deleted.");

},

// action - update
update: async function (req, res) {

    var message = Project.getInvalidIdMsg(req.params);

    if (message) return res.badRequest(message);

    if (req.method == "GET") {

        var model = await Project.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('project/update', { project: model });

    } else {

        if (typeof req.body.project === "undefined")
            return res.badRequest("Form-data not received.");

        var models = await Project.update(req.params.id).set({
            name: req.body.project.name,
        }).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("Record updated");

    }
},

// search function
search: async function (req, res) {

    const qName = req.query.name || "";
    const qsdes = parseInt(req.query.sdes);

    if (isNaN(qsdes)) {

        var models = await Project.find({
            where: { name: { contains: qName } },
            sort: 'name'
        });

    } else {

        var models = await Project.find({
            where: { name: { contains: qName }, sdes: qsdes },
            sort: 'name'
        });

    }

    return res.view('project/index', { projects: models });
},











};

