/**
 * The verifying token that has to match the `hub.verify_token`.
 *
 * @var {string} token
 */
const token = process.env.TOKEN

/**
 * Access headers for CORs.
 *
 * @var {object} headers
 */
const headers = {
  'Access-Control-Allow-Origin': '*',
}

exports.handler = (event, _, callback) => {
  /**
   * @param {number} status Http status to return
   * @param {string} body Response body
   */
  const respond = (status, body) => callback(null, { body, headers, status })

  /**
   * @var {number} challenge Confirmation integer
   */
  const challenge = event.pathParameters['hub.challenge']

  /**
   * @var {number} promoter Matches one of Muffin restaurants
   */
  const promoter = event.pathParameters.promoter

  // Missing configuration.
  if (!token) {
    return respond(500, 'Token missing in enviroment variable.')
  }

  // Is not subscribe request.
  if (event.pathParameters['hub.mode'] !== 'subscribe' || !challenge || !promoter) {
    return respond(422, 'Request has incorrect or missing parameters.')
  }

  // Token sent with the request don't match the one set in the enviroment.
  if (event.pathParameters['hub.verify_token'] !== token) {
    return respond(403, 'Tokens don\'t match.')
  }

  // Responds with the challenge integer to verify the subscribtion.
  respond(200, String(challenge))
}
