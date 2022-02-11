// add middlewares here related to actions
const Action = require('./actions-model');


async function validateActionId(req, res, next) {
    try {
        const { id } = req.params;
        const action = await Action.get(id);
        if(action) {
            req.params = action;
            next();
        } else {
            res.status(404).json({message: "no action with given id"});
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving actions' });
    }
}
async function validateAction(req, res, next) {
    const { project_id, description, notes} = req.body
    if (!project_id || !notes || !description) {
        res.status(400).json({ message: 'Missing required fields' })
    } else {
        req.project_id = project_id
        req.description = description
        req.notes = notes
        next()
    }
}




module.exports = {
    validateActionId,
    validateAction
}