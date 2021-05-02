const db = require('./config/db'),
    express = require('./config/express');
const app = express();
// Connect to MySQL on start
async function main() {
    try {
        await db.connect();
        app.listen(process.env.SENG365_PORT, function () {
            console.log('Listening on port: ' + process.env.SENG365_PORT);
        });
    } catch (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    }
}
main().catch(err => console.log(err));
