const mongoose = require('mongoose');

const A_ZSchema = new mongoose.Schema({
    mainTopic: {
      type: String,
      required: true,
    },
    description: [{
        type: String,
        required: true,
      }],
    topicCoverImage: {
      type: String,
      required: true,
    },
});

module.exports = mongoose.model('A_Z', A_ZSchema);