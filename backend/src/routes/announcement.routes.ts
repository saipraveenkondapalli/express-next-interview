//@ts-nocheck 

import { Router } from "express";
import { getActiveAnnouncements, postActiveAnnouncement } from "../controllers/announcement.controller";


const announcementRouter = Router();    


announcementRouter.get("/all", getActiveAnnouncements);
// announcementRouter.post("/create", postActiveAnnouncement);




export default announcementRouter;
