const defaultErrors = {
    numberMsg: {
        min: (/** @type {number | string} */ value) => `Number expected to be at least ${value}`,
        max: (/** @type {number | string} */ value) => `Number expected to be at most ${value} `
    },
    isExpectedToBe: (/** @type {string} */ type) => `Expected element to be a ${type}`,
    isRequired: `The element is required`,
    invalidProperty: 'Invalid property'
}

export {defaultErrors}