import dotenv from "dotenv";
import { app } from "./app.js";

// const PORT = 3000;

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

