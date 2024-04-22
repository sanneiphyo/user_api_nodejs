import express from 'express';
import {authUser} from '../controller/userController.js'//awarw of puting js at the end
const router = express.Router();

router.post('/auth',authUser)

export default router