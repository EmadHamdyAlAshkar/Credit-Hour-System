import express from "express"
import adminController from "../controlers/project/admin-controller";

const router = express.Router();

router.post('/createadmin',adminController.createadmin)

export default router;