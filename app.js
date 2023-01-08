const app = require('./index')
const database = require("./db");
const logger = require('./logging/logger')


const PORT = process.env.PORT || 3334;
database.connectDb();

app.listen(PORT, () => {
  logger.info(`server connected succesfully to http://localhost:${PORT}`);
});