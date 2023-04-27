import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true
    },
    originUrl: {
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true
    }
})

export default mongoose.model('Url', urlSchema)