/** Run database migrations on start-up, sequentally in order */
const Promise = require('bluebird')
const logger = require('../misc/logger')

const migrations = [
    require('./00-registration-questions'),
    require('./01-remove-project-unique-index'),
    require('./02-rename-sigma_sq-to-sigmaSq'),
    require('./03-rename-country_code-to-countryCode'),
    require('./04-add-finalists-to-event'),
    require('./05-add-track-challenge-to-projectscore'),
    require('./06-finals-active-to-event'),
    require('./07-uniform-answers'),
    require('./08-create-registration-objects-in-profiles'),
    require('./09-sync-registration-to-profiles'),
    require('./10-add-banner-priority-and-approved-to-event'),
    require('./11-add-organization-to-event'),
    require('./12-add-timeline-to-event'),
    require('./13-set-eventLocation-null-where-not-exists'),
    require('./14-add-checklist-to-registration'),
    require('./15-add-meetingRooms-to-event'),
    require('./16-add-faq-challenge_instructions-demoInstructions-to-event'),
    require('./17-add-specific-hackerpacks-to-event'),
    require('./18-add-event-newsletter-link-to-event'),
    require('./19-add-emailConfig-to-event'),
    require('./20-add-new-fields-to-teams-info'),
]

const run = async () => {
    logger.info('Running database migrations before startup...')

    return Promise.each(migrations, (migration, index) => {
        if (typeof migration.index !== 'number') {
            throw new Error(
                `Invalid migration file at index ${index}: migrations must have an index`,
            )
        }

        if (typeof migration.name !== 'string') {
            throw new Error(
                `Invalid migration file at index ${index}: migrations must have a name`,
            )
        }

        if (typeof migration.description !== 'string') {
            throw new Error(
                `Invalid migration file at index ${index}: migrations must have a description`,
            )
        }

        if (typeof migration.run !== 'function') {
            throw new Error(
                `Invalid migration file at index ${index}: migrations must have a property ,run, which is an async function that runs the migration`,
            )
        }

        if (index !== migration.index) {
            throw new Error(
                `Expected migration with index ${index}, got ${migration.index}. Make sure ,you are requiring your migrations in the correct order.`,
            )
        }

        logger.info(`Running ${migration.name} (${migration.description})`)

        return migration
            .run()
            .then(() => {
                logger.info('-> Migration done.')
            })
            .catch(err => {
                logger.error({
                    message: `-> Migration ${migration.name} failed.`,
                    error: {
                        message: err.message,
                        stack: err.stack,
                    },
                })

                throw new Error('Migrations could not complete successfully')
            })
    })
}

module.exports = {
    run,
}
