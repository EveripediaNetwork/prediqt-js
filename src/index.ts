import dotenv from "dotenv";

export { Prediqt } from "./prediqt";
export { PrediqtGraph } from "./prediqt-graph";

try {
    dotenv.config({ path: `${__dirname}/../.env.test` });
} catch (error) {
    console.error(error.message);
}
