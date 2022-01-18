const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const Joi = require('joi');


const { interest_with_principal_amount_and_number_of_days } = require("./functions/investment_interest_data");
const { calculate_interest, calculate_interest_of_days } = require("./functions/investment_returns");


(async() => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    const swaggerOptions = {
        info: {
            title: 'Investment Interest Calculator API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }

    // server.route(Routes);



    server.route({
        method: 'POST',
        path: '/interest',
        options: {
            description: 'Calculate Compound Interest',
            notes: 'Investment interest',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    principal_amount: Joi.number().required(),
                    number_of_days: Joi.number().required()
                })
            },
            handler: (request, h) => {

                let principal_amount = request.payload.principal_amount;
                console.log("principal_amount: " + principal_amount);

                let number_of_days = request.payload.number_of_days;
                console.log("number_of_days: " + number_of_days);


                let data = calculate_interest(principal_amount, number_of_days, interest_with_principal_amount_and_number_of_days)

                return data;
            }

        }

    });


    server.route({
        method: 'POST',
        path: '/interest-with-all-the-days',
        options: {
            description: 'Calculate Compound Interest',
            notes: 'Investment interest',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    principal_amount: Joi.number().required(),
                })
            },
            handler: (request, h) => {

                let principal_amount = request.payload.principal_amount;
                console.log("principal_amount: " + principal_amount);


                let data = calculate_interest_of_days(principal_amount, interest_with_principal_amount_and_number_of_days)

                return data;
            }

        }

    });


})();