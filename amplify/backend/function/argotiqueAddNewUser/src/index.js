/* Amplify Params - DO NOT EDIT
	API_ARGOTIQUE_GRAPHQLAPIIDOUTPUT
	API_ARGOTIQUE_USERTABLE_ARN
	API_ARGOTIQUE_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var aws = require('aws-sdk');
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
    
    let date = new Date();

    if (event.request.userAttributes.sub) {

        let params = {
            Item: {
                'id': {S: event.request.userAttributes.sub},
                '__typename': {S: 'User'},
                'name': {S: event.userName},
                'email': {S: event.request.userAttributes.email},
                'joinedAt': {S: date.toISOString()},
                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
            },
            TableName: process.env.API_ARGOTIQUE_USERTABLE_NAME
        };

        // Call DynamoDB
        try {
            await ddb.putItem(params).promise()
            console.log("Successfully added new user");
        } catch (err) {
            console.log("Error adding new user", err);
        }

        console.log("Success: User sign-up completed");
        context.done(null, event);

    } else {
        // Nothing to do, the user's email ID is unknown
        console.log("Error: New user record was not created");
        context.done(null, event);
    }
};
