const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },

    filetype: {
        type: String,
        required: true,
    },

    dateUploded: {
        type: Date,
        default: Date.now()
    },

    grid_file_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: ""
    },
    filesize: {
        type: Number,
    },
    musician: {
        type: String,
        required: [true, "Please enter the name of the musician as well.."]
    },
    duration_in_seconds: {
        type: Number,
        required: [true, "Please input the duration in seconds.."]
    },
    cover_img: {
        type: String,
        // requried: [true, "Please provide the cover picture of the song..."]
    }
});

const Music = mongoose.model('Song', MusicSchema);

module.exports = Music;