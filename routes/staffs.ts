import { Router } from "express";
import {
    staffsRoot,
    staffsList,
    staffDetailsByQuery,
    staffDetailsByParams,
    addStaff,
    updateStaff,
    deleteStaffByQuery,
    deleteStaffByParams,
    updateStaffBySpecificField,
    staffsBysector
} from "../controllers/staffsController";


const staffsRouter = Router();

staffsRouter.get("/", staffsRoot);

staffsRouter.get("/staffsList", staffsList);

staffsRouter.get("/staffsBysector", staffsBysector);


staffsRouter.get("/staffDetails/", staffDetailsByQuery);

staffsRouter.get("/staffDetails/:id", staffDetailsByParams);

staffsRouter.post("/addStaff", addStaff);

staffsRouter.put("/updateStaff", updateStaff);

staffsRouter.patch("/updateStaffBySpecificField", updateStaffBySpecificField);

staffsRouter.delete("/deleteStaff", deleteStaffByQuery);

staffsRouter.delete("/deleteStaff/:id", deleteStaffByParams);



export default staffsRouter;