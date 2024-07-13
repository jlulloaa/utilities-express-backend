/** WELCOME
 * Simple "Welcome message" to test the endpoint is up and running
 * @param {void}
 * @return {void}
 */

export function welcome(req, res) {
    res.status(200).send('Welcome to Utilities Manager API');
}
