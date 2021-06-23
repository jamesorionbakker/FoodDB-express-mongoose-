import express from 'express';
const app = express();
import * as db from './components/db.js';

app.use(express.static('./client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/get', (req, res, next) => {
    db.getAll()
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});
app.post('/api/post', (req, res, next) => {
    console.log(req.body.data);
    db.addOne(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});
app.delete('/api/delete', (req, res, next) => {
    db.deleteOne(req.body.id)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

app.listen(3000, () => console.log('app listening on port 3000'));
