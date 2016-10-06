import expect from 'expect'
import Money from 'utils/money'

const invalidMoney = [
    null, undefined, '', "", {}, " ", "\n", "\t", "zero",
    Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY,
    Number.MIN_VALUE, Number.MAX_VALUE, (Number.MAX_SAFE_INTEGER + 1),
    3.146, 2322.302, "3.533", "0.434", "0.002",
    0.001, 0.002, 0.0000004
]

const validMoney = [
    Number.MAX_SAFE_INTEGER,
    1, 21, 100, 1000000000, 2389482934940, 0.01, 0.02, 0.1, 0.2, 0.20, 0.9, 0.09,
    1.13,
    "3434", "3434.32", "34345345345.00", "3434.01", "453454354.99", "3434.1",
    "0.01", "0.1", "100000", "010", "1e11"
]

describe('Money-Object', () => {
    describe('Construction', () => {
        it('should construct a valid money object', () => {
            const amount = 1.20
            const money = new Money(amount)
            expect(typeof money).toBe('object');
            expect(money.amount).toBe(1.20)
        })
    })

    describe('InValid Money', () => {
        it('should throw error on passing invalid money', () => {
            invalidMoney.forEach((amount) => {
                expect(function() {
                    new Money(amount)
                }).toThrow()
            })
        })
    })

    describe('Valid Money', () => {
        it('should construct proper money object', () => {
            validMoney.forEach((amount) => {
                const money = new Money(amount)
                expect(money.amount).toBe(Number(amount))
            })
        })
    })
})
