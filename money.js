export default class Money {
    constructor(amount, currency, fractionSeparator) {

        fractionSeparator = fractionSeparator || '.'

        if(amount !== Money.ZERO) {

            if(this._isNumeric(amount) === false) {
                throw 'The amount is not valid.'
            }

            if(Number(amount) < 0.01) {
                throw 'The amount must be greater than zero.'
            }

            if(Number(amount) > Number.MAX_SAFE_INTEGER) {
                throw 'This class does not accept numbers greater than Number.MAX_SAFE_INTEGER'
            }

            if(typeof amount === 'string') {
                if(amount.trim() !== amount) {
                    throw 'The amount is not valid.'
                }
            }

            if(!this._isInt(amount) && amount.toString().split(fractionSeparator)[1].length > 2) {
                throw 'The fractional unit of value must be in between 0-99'
            }

        }

        const amountParts = Number(amount).toFixed(2)
                                  .toString()
                                  .split(fractionSeparator)

        this._fractionSeparator = fractionSeparator
        this._setAmount(Number(amountParts[0]), Number(amountParts[1]))
    }

    _inTwoDigits(number) {
        if(number > 99) {
            throw 'The first argument cannot be greater than 99'
        }
        if(number < 0) {
            throw 'The first argument must be positive or 0'
        }

        return ("0" + number).slice(-2)
    }

    _setAmount(mainUnit, fractionalUnit) {
        this._mainUnit = mainUnit
        this._fractionalUnit = fractionalUnit
        const amount = [mainUnit,
                        this._fractionSeparator,
                        this._inTwoDigits(fractionalUnit)
                       ].join('')
        this.amount = Number(amount)
    }

    _isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

    _isInt(n) {
        return n % 1 === 0
    }

    add(moneyObject) {
        if(moneyObject.constructor.name !== 'Money') {
            throw 'The first argument must be of Money Class.'
        }

        let mainUnit = this._mainUnit + moneyObject._mainUnit
        const fractionalPart = this._fractionalUnit + moneyObject._fractionalUnit
        const fractionalUnit = fractionalPart % 100

        if(fractionalPart - fractionalUnit > 0) {
            mainUnit = mainUnit + 1
        }

        this._setAmount(mainUnit, fractionalUnit)

        return this
    }
}

// Constants
Money.ZERO = 0
