/** Change the way registration questions are stored in the Event model.
 *  Previously events had a rather strange UserDetailsConfig object for defining
 *  which questions to ask in the registration form. This script makes the following
 *  change to the event model:
 *
 *  Before:
 *  {
 *    userDetailsConfig: {
 *      phoneNumber: {
 *          enabled: true,
 *          required: true,
 *          editable: true
 *      },
 *      countryOfResidence: {
 *          enabled: true,
 *          required: false,
 *          editable: true
 *      },
 *      ...(all other fields here)
 *    }
 *  }
 *
 *  After:
 *  {
 *    registrationConfig: {
 *      optionalFields: ['countryOfResidence'],
 *      requiredFields: ['phoneNumber'],
 *    }
 *  }
 *
 *  In addition, the "editable" field which was used just for disallowing
 *  removing firstName, lastName, email from the registration questions, is
 *  replaced with just hardcoding this condition in code rather than in the
 *  event model.
 */

module.exports = {
    index: 0,
    name: '00-registration-questions',
    description: 'Migrate userDetailsConfig to registrationConfig',
    run: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Something went wrong...'))
            }, 2000)
        })
    },
}
