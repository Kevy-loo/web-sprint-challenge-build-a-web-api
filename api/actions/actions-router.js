// Write your "actions" router here!
const router = require('express').Router();
const Action = require('./actions-model');

const { validateActionId, validateAction } = require('./actions-middlware');

router.get('/', async (req, res) => {
    try{
        const actions = await Action.get();
        res.status(200).json(actions);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving actions' });
    }
})

router.get('/:id', validateActionId, async (req, res) => {
    try{
        const actionId = await Action.get(req.params.id);
        res.status(200).json(actionId);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving actions' });
    }
})

router.post('/',  validateAction, async (req, res) => {
    try{
        const action = await Action.insert(req.body);
        res.status(200).json(action);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving actions' });
    }
})

router.put("/:id", validateActionId, validateAction, async (req, res) => {
    try {
        const updatedAction = await Action.update(req.params.id, req.body);
        res.status(200).json(updatedAction) ;
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving actions' });
    }
})

router.delete('/:id', validateActionId, async (req, res) => {
    try {
        const actionDel = await Action.remove(req.params.id);
        res.status(200).json(actionDel);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Error retrieving actions' });
    }
})


module.exports = router;