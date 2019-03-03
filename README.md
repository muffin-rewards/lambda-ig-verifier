# Lambda: IG verifier

Verifies new Instagram API webhooks.

## Deployment
To deploy the lambda for production, use `npm run deploy:prod`.

## Request
The request `GET` satisfies the [authorizer lambda](). There are 3 mandatory
query parameters:

- `hub.verify_token` which is a token that is set in the IG Dashboard when creating
new webhook
- `hub.mode` has to be equal to `subscribe`
- `hub.challenge` is an integer that we respond with if the request is valid

## Response
If everything is `ok`, the respond body is equal to `hub.challenge`.
The response can be intercepted by the [authorizer lambda]().
If the enviroment has not been setup, it respond with http status `500`.
If the challenge is empty or mode is not correct it responds with `422`.
If the token does not match, it responds with http status `403`.
Otherwise it responds with `200` and puts `hub.challenge` into body.
