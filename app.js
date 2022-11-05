const app = require('./index')
const database = require("./db");


const PORT = process.env.PORT || 3334;
database.connectDb();

app.listen(PORT, () => {
  console.log(`server connected succesfully to http://localhost:${PORT}`);
});