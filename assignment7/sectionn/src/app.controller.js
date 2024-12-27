import { checkdbConnection, checkdbSync } from "./DB/modules/connectionDB.js";
import { productRouter } from "./modules/users/product.controller.js";
import userRouter from "./modules/users/user.controller.js";
import tableRouter from "./DB/modules/tables.controller.js";

const approotee = (app, express) => {
    app.use(express.json()); 
    checkdbConnection()
    checkdbSync()
    app.use("/JDB", tableRouter);
    app.use("/users", userRouter);
    app.use("/register", userRouter);
    app.use("/products", productRouter); 
    app.use("*", (req, res, next) => {
        return res.status(404).json({ msg: "404 page not found" }); // Handle 404 errors
    });
};

export default approotee;