// eslint-disable-line
import * as dotenv from "dotenv";

import envalid = require("envalid");

dotenv.config();

export default envalid.cleanEnv(process.env, {
  MONGOURL: envalid.str(),
});
