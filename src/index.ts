import dotenv from "dotenv";

let path;
switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../.env.test`;
        break;
    case "production":
        path = `${__dirname}/../.env.production`;
        break;
    default:
        path = `${__dirname}/../.env`;
}
const currentConfig = dotenv.config({ path });

if (currentConfig.error) {
    throw currentConfig.error;
}

export {Prediqt} from "./prediqt";
