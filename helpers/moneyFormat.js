const moneyFormatEUR = (value) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR',
    })
}

const moneyFormatUSD = (value) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

const moneyFormatMXN = (value) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'MXN',
    })
}

export {moneyFormatEUR, moneyFormatUSD, moneyFormatMXN}