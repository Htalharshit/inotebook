const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


// Route 1: Fetching All notes. login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }

})

// Route 2: Adding notes.login required 
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save();
        res.send(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }

})

// Route 3: Updating notes.login required 
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //  Crreate new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: "Note not found" })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Not Allowed" })
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }

});

// Route 4: Deleting notes.login required 
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: "Note not found" })
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Not Allowed" })
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some error occured' });
    }

});

module.exports = router