const express=require('express')
const Notes = require('../models/Notes');
const fetchUser=require('../middleware/fetchuser');
const {body, validationResult } = require('express-validator');
const router=express.Router();

//Route 1: Get all notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try {
        const notes= await Notes.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})
//Route 2: Add a new notes using: POST "/api/notes/addnotes". Login required
router.post('/addnotes',fetchUser,[body('title','Title is required').isLength({min: 3}),body('description','Description must have atleast 5 characters').isLength({min: 5}),],
    async (req, res) => {
        try {
            const { title, description, tags } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() })
            }
            const notes = new Notes({
                title, description, tags, user: req.user.id
            })
            const savedNotes = await notes.save()
            res.json(savedNotes)
        }
        catch(error){
            console.error(error.message)
            res.status(500).send("Internal Server Error");
        }
        
    })
    
//Route 3: Update notes using: PUT "/api/notes/updatenotes/.id". id in the url is the object id of particular notes to update. Login required
router.put('/updatenotes/:id',fetchUser,async (req, res) => {

            const { title, description, tags } = req.body;
            try{
            //create a new note obj
            const newNotes={}
            if(title){newNotes.title=title}
            if(description){newNotes.description=description}
            if(tags){newNotes.tags=tags}

            //find notes to be updated and update it
            let note= await Notes.findById(req.params.id);
            if(!note){
                res.status(404).send("Notes not found")
            }
            if(note.user.toString()!==req.user.id){
                res.status(401).send("User not authorised")
            }
            note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
            res.json({note})
            }catch(error){
                console.error(error.message)
                res.status(500).send("Internal Server Error");
            }
    })
    //Route 4: Delete notes using: DELETE "/api/notes/deletenotes/.id". id in the url is the object id of particular notes to update. Login required
router.delete('/deletenotes/:id',fetchUser,async (req, res) => {
    try{
    //find notes to be deleted and delete it
    let note= await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Notes not found")
    }
    //Allow deletion only if user owns the notes
    if(note.user.toString()!==req.user.id){
        res.status(401).send("User not authorised")
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"The selected note is successfully deleted",note})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router