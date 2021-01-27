const router = require('express').Router();
const dbService = require('../service/dbService')

router.get('/users', async (req, res)=> {
    try {
        dbService.getUsers(req,res)
    } catch (e) {
        res.status(400).send(e.message);
    }
});


router.post('/users', async (req, res)=> {
    try {
        dbService.addUser(req,res)
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.delete('/users/:id', async (req, res)=> {
    try {
        dbService.deleteUser(req,res)
    } catch (e) {
        res.status(400).send(e.message);
    }
});
router.put('/users/:id', async (req, res)=> {
    try {
        dbService.updateUser(req,res)
    } catch (e) {
        res.status(400).send(e.message);
    }
});
module.exports = router;