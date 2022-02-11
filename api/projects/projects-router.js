// Write your "projects" router here!
const router = require('express').Router();
const Project = require('./projects-model');

const { validateProjectId, validateProject } = require('./projects-middleware')

router.get('/', async (req, res) => {
    try {
      const project = await Project.get();
      res.status(200).json(project);
    } catch (error) {
      console.log('error', error );
      res.status(500).json({ message: 'Error retrieving projects'});
    }
})

router.get('/:id', validateProjectId, (req, res) => {
    try {
        res.json(req.params);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving projects' });
    }
})

router.post('/', validateProject, async (req, res) => {
    try {
        const newProject = await Project.insert(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error adding projects' });
    }
})

router.put('/:id', validateProjectId, validateProject, async (req, res) => {
    try {
        const updatedProject = await Project.update(req.params.id, req.body);
        res.status(200).json(updatedProject);
    } catch(error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving projects' });
    }
})


router.delete('/:id', validateProjectId, async (req, res) => {
    try {
        const projectDel = await Project.remove(req.params.id);
        res.status(200).json(projectDel);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving projects' });
    }
})

router.get('/:id/actions', validateProjectId, async (req, res) => {
    try {
        const actions = await Project.getProjectActions(req.params.id);
        res.status(200).json(actions)

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving projects' });
    }
})







module.exports = router;