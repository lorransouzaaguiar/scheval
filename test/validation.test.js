import { validate, val, defaultErrors } from '../src/index.js'
import { describe, expect, it } from '@jest/globals'

describe('Validation', () => {

    describe('testing number methods', () => {
        it('should return error message if element is not a number', () => {
            const { error } = val('some-string').number()
            expect(error).toBe(defaultErrors.isExpectedToBe('number'))
        })
        it('should not return error if element is a number', () => {
            const { error } = val(5).number()
            expect(error).toBeFalsy()
        })

        describe('min', () => {
            it('should return error message if number is less then min value', () => {
                const { error } = val(5).number().min(6)
                expect(error).toBe(defaultErrors.numberMsg.min(6))
            })
            it('should not return error if number is equal or bigger then min value', () => {
                const equal = val(6).number().min(6)
                const bigger = val(7).number().min(6)
                expect(equal.error).toBeFalsy()
                expect(bigger.error).toBeFalsy()
            })
        })

        describe('max', () => {
            it('should return error message if number is bigger then max value', () => {
                const { error } = val(5).number().max(4)
                expect(error).toBe(defaultErrors.numberMsg.max(4))
            })
            it('should not return error message if number is equal or less then max value', () => {
                const equal = val(6).number().max(6)
                const less = val(5).number().max(6)
                expect(equal.error).toBeFalsy()
                expect(less.error).toBeFalsy()
            })
        })
    })

    describe('testing string methods', () => {
        it('should return error message if element is not a string', () => {
            const { error } = val(5).string()
            expect(error).toBe(defaultErrors.isExpectedToBe('string'))
        })
        it('should return error message if element is required', () => {
            const { error } = val('').string().isRequired()
            expect(error).toBe(defaultErrors.isRequired)
        })
        it('should not return error message if element is a string', () => {
            const { error } = val('some-string').string()
            expect(error).toBeFalsy()
        })
    })

    describe('testing isRequired method', () => {
        it('should return error message if element is required', () => {
            const { error } = val(undefined).string().isRequired()
            expect(error).toBe(defaultErrors.isRequired)
        })
        it('should not return error message of isRequired if method isRequired is invoked and element has a type', () => {
            const v1 = val(1).string().isRequired()
            const v2 = val('').number().isRequired()
            expect(v1.error).toBe(defaultErrors.isExpectedToBe('string'))
            expect(v2.error).toBe(defaultErrors.isExpectedToBe('number'))
        })
    })

    describe('testing schema', () => {
        it('should return errors message if schema capture errors of validations', () => {
            const schema = {
                name: val(1).string(),
                price: val('22').number()
            }
            const { errors, isValid } = validate(schema)

            expect(errors).toEqual({
                name: defaultErrors.isExpectedToBe('string'),
                price: defaultErrors.isExpectedToBe('number')
            })
            expect(isValid).toBe(false)
        })
        it('should return a schema with valid data', () => {
            const { data, errors, isValid } = validate({
                name: val('aaaa').string(),
                price: val(22).number()
            })
            expect(isValid).toBe(true)
            expect(errors).toEqual({})
            expect(data).toEqual({ name: 'aaaa', price: 22 })
        })
    })
})