const express = require('express');
const db = require('./db');
const { validateNote } = require('../middleware/validation');

const routes = express.Router();

// get all notes
routes.get('/notes', (req, res) => {
    db.all(`SELECT * FROM notes ORDER BY created_at DESC`, (err, rows) => {
        if(err) {
            return res.status(400).json({
                message: 'error is fetching posts',
                status: 0
            });
        }
        res.json(rows);
    });
});

// post a note
routes.post('/notes', validateNote,(req, res) => {
    const {title, description, category} = req.body;
    const created_at = new Date().toLocaleString();
    const updated_at = new Date().toLocaleString();

    if(title === undefined || description === undefined || category === undefined) {
        return res.status(400).json({
            message: 'title or body is not defined',
            status: 0
        })
    }
    if(title.length === 0 || description.length === 0 || category.length === 0) {
        return res.status(400).json({
            message: "title or body is empty",
            status: 0
        })
    }

    db.run(
        `INSERT INTO notes (title, description, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
        [title, description, category, created_at, updated_at],
        function(err) {
            if(err) {
                return res.status(400).json({
                    message: 'error in inserting note',
                    status: 0
                });
            }
            res.status(201).json({
                id: this.lastID,
                message: 'created successfully',
                status: 1
            });
        }
    );
});

routes.put('/notes/:id', validateNote,(req, res) => {
    const id = req.params.id;
    const {title, description, category} = req.body;
    const updated_at = new Date().toLocaleString();
    db.run(
        `UPDATE notes SET title = ?, description = ?, category = ?, updated_at = ? WHERE id = ?`,
        [title, description, category, updated_at, id],
        function(err) {
            if(err) {
                return res.status(400).json({
                    message: 'error in updating note',
                    status: 0
                });
            }
            if(this.changes === 0) {
                return res.status(404).json({
                    message: 'notes not found!'
                });
            }
            res.status(200).json({
                message: 'note updated successfully',
                status: 1
            });
        }
    );
});

routes.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    db.run(
        `DELETE FROM notes WHERE id = ?`,
        [id],
        function(err) {
            if(err) {
                return res.status(400).json({ 
                    message: 'error deleting assignment',
                    status: 0
                });
            }
            if(this.changes === 0) {
                return res.status(404).json({
                    message: 'notes not found',
                    status: 0
                });
            }
            res.status(200).json({
                message: 'deleted successfully',
                status: 1
            });
        }
    );
});



module.exports = routes;