import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";
import CategoryRoutes from "./routes/api/category";
import orderRoutes from "./routes/api/order";
import productRoutes from "./routes/api/product";
import userRoutes from "./routes/api/user";
import logger from "./utilities/logger";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', logger, (req, res) => {
    res.send("Server working.");
});
app.use('/api', routes);

productRoutes(app);
userRoutes(app);
orderRoutes(app);
CategoryRoutes(app);

app.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});

export default app;