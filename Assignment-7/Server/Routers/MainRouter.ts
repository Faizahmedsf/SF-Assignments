import express from "express"
const router = express.Router()
import Controller from "../Controllers/MainController"

router.get("/getuser" , Controller.getUser )

router.get("/getsingleuser/:id" , Controller.singleUser )

router.post("/postuser" , Controller.postUser )

router.patch("/updateuser/:id" , Controller.updateUser )

router.delete("/deleteuser/:id" , Controller.deleteUser )

export default router