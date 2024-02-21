export const debugGroup = (
    groupName = 'Debug group',
    debugTarget = [],
    groupColor = 'yellow',
) => {
    console.group(`%c${groupName}`, `color: ${groupColor};font-size: 20px;`)
    Array.isArray(debugTarget)
        ? debugTarget.forEach((item, index) => {
              console.log(`%c${index}`, `color: green;font-size: 16px;`, item)
          })
        : console.log(debugTarget)
    console.groupEnd()
}
