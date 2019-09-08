const _ = require('lodash');

/**
 * Adds a new static method, updateAllowed, which only applies updates to fields that aren't blacklisted
 */

function updateAllowedPlugin(schema, {
	blacklisted = []
} = {}) {
	schema.statics.updateAllowed = function (doc, updates) {
		_.forOwn(updates, (value, key) => {
			if (blacklisted.indexOf(key) === -1) {
				doc[key] = value;
			}
		});

		return doc.save();
	}
}

module.exports = updateAllowedPlugin;