export const warn = function (msg, componentName) {
   /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    const component = componentName ? `<${componentName}> ` : ''
    console.error(`[pot warn]: ${component}${msg}`)
  }
}

export const tip = function (msg, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    const component = componentName ? `<${componentName}> ` : ''
    console.warn(`[pot tip]: ${component}${msg}`)
  }
}
