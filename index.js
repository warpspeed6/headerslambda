'use strict';
exports.handler = (event, context, callback) => {

    // Lets store request and request headers so that we can use it later
    const request = event.Records[0].cf.request;
    const headers = request.headers;


    // Local Auth
    // TODO Cognito
    const authUser = 'user';
    const authPass = 'XXXXXXXXX';

    // Basic Auth 
    const auth = 'Basic ' + new Buffer(authUser + ':' + authPass).toString('base64');

    // Basic authentication
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != auth) {
        const body = '<b>No page for you. Lambda@Edge said Unauthorized</b>';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
            },
        };
        callback(null, response);
    }

    // Continue if all iz well
    callback(null, request);
};
