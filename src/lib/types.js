import { defaultErrors } from "./error-messages.js"


/** @typedef {{error: string; isRequired: any }} CustomString */ 
    
    /**
     * @typedef {(value: number, newError?: string) => CustomNumber} CustomNumberFunction
     */
    
    /**
     * @typedef {{
    *  error: string;
    *  min: CustomNumberFunction
    *  max: CustomNumberFunction
    *  isRequired: any
    * }} CustomNumber
     */
     
    
    /**
    *  @typedef {{
    *  elem: any
    *  error: string
    *  isUndefined: boolean
    *  [x: string]: any
    * }} Elem
     */
    
    /**
    * @typedef {{
    *  number: () => CustomNumber
    *  string: () => CustomString
    * }}  Types
    */
    
    /**
     * @typedef {(elem: any) => {
     *  number: () => CustomNumber,
     *  string: () => CustomString
     * }} Validator 
     * */


const applyErrorByCondition = (condicional, newError) => condicional() ? newError : ''

/**
 * @param {Elem} element
 * @returns {CustomString} */
 const string = (element) => {
    const {elem, isUndefined} = element
    const isNotAString = typeof elem === 'string' && elem.length === 0
    const error = applyErrorByCondition(() => !element?.string && !isUndefined, element.error)
    const {isRequired} = defaultErrors
    
    return {
        error,
        isRequired (newError = isRequired) {
            this.error = error ? error 
                : applyErrorByCondition(() => isUndefined || isNotAString, newError)
            return this
        }
    }
}

/**
 * @param {Elem} element 
 * @returns {CustomNumber} 
 */
const number = (element) => {
    const {elem, isUndefined} = element
    const isNumber = element?.number
    const error = applyErrorByCondition(() => !isNumber && !isUndefined, element.error)
    const {numberMsg, isRequired} = defaultErrors
    
    return {
        error,
        min (value, newError = numberMsg.min(value)) {
            this.error = applyErrorByCondition(() => isNumber && !(elem >= value), newError)
            return this             
        },
        max (value, newError = numberMsg.max(value)) {
            this.error = applyErrorByCondition(() => isNumber && !(elem <= value), newError)
            return this         
        },
        isRequired (newError = isRequired) {
            this.error = error ? error 
                : applyErrorByCondition(() => isUndefined, newError)
            return this
        }
    }
}

/** 
* @param {any} elem 
* @returns {Types}
*/
const types = (elem) => {
    const {isExpectedToBe} = defaultErrors
    const isNotANumber = isNaN(elem) && typeof elem !== 'string'
    const isUndefined = typeof elem === 'undefined' ||  isNotANumber 
    
    /**@type {Elem} */
    const element = {
        elem,
        isUndefined,
        [typeof elem]: true,
        error: ''
    }

    return {
        number: (newError = isExpectedToBe('number')) => {
            element.error = newError
            return ({value: elem, ...number(element)})
        },
        string: (newError = isExpectedToBe('string')) => {
            element.error = newError
            return ({value: elem, ...string(element)})
        }
            
    }
}



export {types}


