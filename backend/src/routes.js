const express = require('express');
const db = require('./db');

const routes = express.Router();

// get all notes
routes.get('/notes', (req, res) => {
    db.all(`SELECT * FROM notes`, (err, rows) => {
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
routes.post('/notes', (req, res) => {
    const {title, body} = req.body;

    if(title === undefined || body === undefined) {
        return res.status(400).json({
            message: 'title or body is not defined',
            status: 0
        })
    }
    if(title.length === 0 || body.length === 0) {
        return res.status(400).json({
            message: "title or body is empty",
            status: 0
        })
    }

    db.run(
        `INSERT INTO notes (title, body) VALUES (?, ?)`,
        [title, body],
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

routes.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const {title, body} = req.body;

    db.run(
        `UPDATE notes SET title = ?, body = ? WHERE id = ?`,
        [title, body, id],
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