import express from 'express';
const router = express.Router();
import mainController from "../Controller/Controller"

router.get('/crud/users' , mainController.getdata)

router.get('/crud/users/:id' , mainController.getsingleuser)

router.post('/crud/users' , mainController.postdata)
 
router.patch('/crud/users/:id' ,  mainController.patchdata)

router.delete('/crud/users/:id' , mainController.deletedata)


export default router