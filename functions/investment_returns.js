const { interest_with_principal_amount_and_number_of_days } = require("./investment_interest_data");




function getTotalInterest(principal_amount, interest_rate, number_of_days) {
    return principal_amount * (interest_rate / 100) * (number_of_days / 365)
}

function getTotalAmount(principal_amount, totalInterest) {
    return principal_amount + totalInterest
}


function calculate_interest(principal_amount, number_of_days, interest_with_principal_amount_and_number_of_days) {

    let totalInterest = 0
    let totalAmount = 0
    let interest_rate = 0

    interest_with_principal_amount_and_number_of_days.map(data => {

        if (principal_amount > data.min_amount && principal_amount <= data.max_amount) {

            data.days.map(data_in_days => {

                if (number_of_days > data_in_days.min_days && number_of_days <= data_in_days.max_days) {
                    interest_rate = data_in_days.interest

                    totalInterest = getTotalInterest(principal_amount, data_in_days.interest, number_of_days)

                    totalAmount = getTotalAmount(principal_amount, totalInterest)
                }

            })

        }
    })

    return {
        principal_amount: principal_amount,
        number_of_days: number_of_days,
        interest_rate: interest_rate,
        totalInterest: totalInterest.toFixed(2),
        totalAmount: totalAmount.toFixed(2)

    }
}



function calculate_interest_of_days(principal_amount, interest_with_principal_amount_and_number_of_days) {

    let totalInterest = 0
    let totalAmount = 0
    let interest_rate = 0

    let calculated_days = {}

    interest_with_principal_amount_and_number_of_days.map(data => {

        if (principal_amount > data.min_amount && principal_amount <= data.max_amount) {

            data.days.map(data_in_days => {


                interest_rate = data_in_days.interest

                totalInterest = getTotalInterest(principal_amount, data_in_days.interest, data_in_days.max_days)

                totalAmount = getTotalAmount(principal_amount, totalInterest)

                data_in_days.totalInterest = totalInterest.toFixed(2)

                data_in_days.totalAmount = totalAmount.toFixed(2)

                // calculated_days = data_in_days

                calculated_days = data

            })

        }
    })

    return calculated_days
}


module.exports = {
    calculate_interest: calculate_interest,
    calculate_interest_of_days: calculate_interest_of_days
};