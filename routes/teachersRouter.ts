import { Router } from "express";
import {
    teachersRoot,
    teachersList,
    teacherDetailsByQuery,
    teacherDetailsByParams,
    addTeacher,
    updateTeacher,
    deleteTeacherByQuery,
    deleteTeacherByParams,
    updateTeacherBySpecificField,
    teachersBysubject
} from "../controllers/teachersController";


const teachersRouter = Router();

teachersRouter.get("/", teachersRoot);

teachersRouter.get("/teachersList", teachersList);

teachersRouter.get("/teachersBysubject", teachersBysubject);


teachersRouter.get("/teacherDetails/", teacherDetailsByQuery);

teachersRouter.get("/teacherDetails/:id", teacherDetailsByParams);

teachersRouter.post("/addTeacher", addTeacher);

teachersRouter.put("/updateTeacher", updateTeacher);

teachersRouter.patch("/updateTeacherBySpecificField", updateTeacherBySpecificField);

teachersRouter.delete("/deleteTeacher", deleteTeacherByQuery);

teachersRouter.delete("/deleteTeacher/:id", deleteTeacherByParams);



export default teachersRouter;