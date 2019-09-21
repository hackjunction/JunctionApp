const express = require('express');
const router = express.Router();
const Registration = require('../registration/model');

router.route('/').get((req, res) => {
    return res.status(200).send('DEVTOOLS HERE');
});

router.route('/anonymize-registrations').get(async (req, res) => {
    const registrations = await Registration.find({});

    const updates = registrations.map(registration => {
        return {
            updateOne: {
                filter: {
                    _id: registration._id
                },
                update: {
                    $set: {
                        'answers.firstName': 'Anonymous',
                        'answers.lastName': 'Owl',
                        'answers.email':
                            'juuso.lappalainen+' + Math.floor(Math.random() * 1000000) + '@hackjunction.com'
                    }
                }
            }
        };
    });

    const result = await Registration.bulkWrite(updates);

    return res.status(200).json(result);
});

module.exports = router;
