const mongoose = require('mongoose');

const DiscordConfig = new mongoose.Schema({
    enabled: {
        type: Boolean,
        required: true,
        default: false
    },
    inviteLink: {
        type: String,
        required: function() {
            return this.enabled;
        }
    }
});

module.exports = DiscordConfig;
