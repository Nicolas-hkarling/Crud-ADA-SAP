import express from "express";
import dotenv from "dotenv";
import studentsRouter from "../routes/studentsRouter";
import cors from "cors";
import teachersRouter from "../routes/teachersRouter";
import staffsRouter from "../routes/staffs";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h3 style='color: blue'>Hello World</h3>");
});

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);
app.use("/staffs", staffsRouter);

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
})
