export const gradientRandomizer = () => {
    const colorOptions = [
        'tw-from-teal-400 tw-to-blue-500',
        'tw-from-purple-400 tw-to-pink-500',
        'tw-from-green-400 tw-to-blue-500',
        'tw-from-yellow-400 tw-to-red-500',
        'tw-from-red-400 tw-to-pink-500',
        'tw-from-yellow-400 tw-to-orange-500',
        'tw-from-green-400 tw-to-teal-500',
        'tw-from-purple-400 tw-to-indigo-500',
        'tw-from-blue-400 tw-to-purple-500',
        'tw-from-red-400 tw-to-pink-500',
        'tw-from-yellow-400 tw-to-orange-500',
    ]
    return colorOptions[Math.floor(Math.random() * colorOptions.length)]
}

export const stringShortener = (str, length) => {
    if (str.length > length) {
        return `${str.substr(0, length)}...`
    } else {
        return str
    }
}
