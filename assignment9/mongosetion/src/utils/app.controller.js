import { connectionDb } from "../DB/connectionDB.js";
import bookControllar from "../moduels/users/book.controller.js";

const approotee = (app, express) => {
    app.use(express.json()); 
    app.use("/collection", bookControllar);
    connectionDb()
}

export default approotee;