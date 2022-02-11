// add middlewares here related to projects
const Projects = require("./projects-model")

async function validateProjectId(req, res, next) {
    try {
        const { id } = req.params;
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json({message: "project not found"});
        } else {
            req.params = project;
            next();
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving projects' });
    }
}

function validateProject(req, res, next) {
    const { name, description, completed} = req.body
    if (!name || !description || !completed) {
        res.status(400).json({ message: 'Missing required fields' })
    } else {
        req.name = name
        req.description = description
        req.completed = completed
        next()
    }
}

module.exports = { validateProjectId, validateProject };
