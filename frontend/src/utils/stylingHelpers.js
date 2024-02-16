import gradientList from './constants/gradientList'

export const gradientRandomizer = () => {
    return gradientList[Math.floor(Math.random() * gradientList.length)]
}

export const gradientSelector = (index = 0) => {
    if (index >= gradientList.length) {
        return gradientList[0]
    }
    return gradientList[index]
}

export const stringShortener = (str, length) => {
    if (str.length > length) {
        return `${str.substr(0, length)}...`
    } else {
        return str
    }
}
