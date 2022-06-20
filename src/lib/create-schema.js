/** @typedef {{isValid: boolean, errors: string[], data: any}} CreateSchemaResult */

export const dealWithSchema = () => {
    
    const result = (isValid, errors, data) => ({isValid, errors, data})

    /**@returns {CreateSchemaResult} */
    const createSchema = (schema) => {
        const {schemErrorMsg, hasErrorsInSchema} = findErrorsInSchema(schema)

        if(hasErrorsInSchema) {
            return result(false, schemErrorMsg)
        }
        const validSchema = generateValidSchema(schema)
        return result(true, schemErrorMsg, validSchema)
    }

    const generateValidSchema = (schema) => {
        const validSchema = {}
        const schemaAttrAndValues = Object.entries(schema)
        schemaAttrAndValues.forEach(([key, item]) => {
            validSchema[key] = item.value
        })
        return Object.freeze(validSchema)
    }

    const findErrorsInSchema = (schema) => {
        const schemErrorMsg = {}
        const schemaAttrAndValues = Object.entries(schema)

        schemaAttrAndValues.forEach(([key, value]) => {
            const {error} = value
            if(error?.length) {
                schemErrorMsg[key] = error
            }  
        })

        const hasErrorsInSchema = Object.entries(schemErrorMsg).length
        
        return {schemErrorMsg, hasErrorsInSchema}
    }

    return Object.freeze({createSchema})
}