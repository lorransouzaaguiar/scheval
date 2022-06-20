import { dealWithSchema } from './lib/create-schema.js'
import { defaultErrors } from './lib/error-messages.js'
import { types } from './lib/types.js'

///**@typedef {import('./lib/create-schema').CreateSchemaResult} CreateSchemaResult*/
///**@typedef {import('./lib/types').Types} Types*/

const { createSchema } = dealWithSchema()

/**
 *
 * @param {any} elem
 * @returns {import('./lib/types').Types}
 */
const val = (elem) => Object.freeze({ ...types(elem) })

/**
 *
 * @param {any} schema
 * @returns {import('./lib/create-schema').CreateSchemaResult}
 */
const validate = (schema) => createSchema(schema)

export { val, validate, defaultErrors }
