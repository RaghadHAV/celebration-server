const celeb = require('./model-celeb')
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api', (req, res, next) => {
    celeb.find({}).then(c => {
        res.json(c);
    }).catch(error => next(error))
})

app.post('/api', (req, res, next) => {
    const body = req.body;
    const celebObject = new celeb({
        name: body.name,
        kind: body.kind,
        description: body.description,
        serving: body.serving
    })
    celebObject.save()
        .then(savedObject => {
            return savedObject.toJSON()
        })
        .then(savedAndFormatObject => {
            res.json(savedAndFormatObject)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

