module.exports = {
    isEmail: value => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(value).toLowerCase())
    },
    arrayOfStringsValidator: (value, validationSchema) => {
        console.log('From array of strings validator')
        console.log(value)
        if (Array.isArray(value)) {
            if (value.length === 0) return true
            return value.every(lang => validationSchema.indexOf(lang) !== -1)
        }
        if (typeof value === 'string') {
            return validationSchema.asArrayOfNames.indexOf(value) !== -1
        }
        return false
    },
}
