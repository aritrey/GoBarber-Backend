import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes";
import "reflect-metadata";

import "./database";
import uploadConfig from "./config/upload";
import AppError from "./errors/AppError";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: "internal server error",
    });
});

app.listen(3333, () => {
    console.log("   server start on port 3333");
});
