import "dotenv/config";
// import config from "./config.js";

import connectionDatabase from "./database.js";
import app from "./app.js";
import logger from "./utils/logger.js";

const port = process.env.PORT || 4213;

connectionDatabase(process.env.MongoDB_URI);

app.listen(port, () => logger.info(`Server started on port ${port}`));
