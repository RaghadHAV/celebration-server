const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/celebration'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const celebSchema = new mongoose.Schema({
    name: {
        type: String
    },
    kind: {
        type: String
    },
    description: {
        type: String
    },
    serving: {
        type: String
    }
})

celebSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Defining the model from the schema
module.exports = mongoose.model('celeb', celebSchema)

// const newCeleb = new celeb({
//     name: 'test'
// })

// newCeleb.save()
//     .then(savedceleb => {
//         console.log('saved', savedceleb)
//     }).catch(error => {
//         console.log(error)
//     })
