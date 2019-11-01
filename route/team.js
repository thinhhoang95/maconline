import { newScore, newTeam, deleteScore, queryScore, showAllTeams } from '../controller/team';
import express from 'express';

var router = express.Router();

// Create new team
router.post('/team', async (req, res) => {
    try {
        let teamInfo = req.body;
        await newTeam(teamInfo);
        res.status(200).send('Team successfully created');
    } catch (error) {
        console.log(error);
        res.status(500).send('Cannot create new team: ' + error);
    }
});

router.post('/score', async (req, res) => {
    try {
        let id = req.body.id;
        let referee = req.body.referee;
        let data = req.body.data;
        await newScore(id, referee, data);
        res.status(200).send('Score successfully created');
    } catch (error)
    {
        console.log(error);
        res.status(500).send('Cannot create new score: ' + error);
    }
});

router.get('/', async (req, res) => {
    try {
        let teams = await showAllTeams();
        console.log(teams);
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
        res.status(500).send('Cannot get teams: ' + error);
    }
});

module.exports = router;