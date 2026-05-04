import {Router} from 'express'
import multer from 'multer'
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountdetail } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
const router = Router()


router.route("/register").post(
    multer().none(),
    registerUser
)
router
.route("/login")
.post(multer().none(), loginUser)

router
.route("/logout")
.post(verifyJWT, logoutUser)

router.route("/refreshAccessToken")
.post(multer().none(), refreshAccessToken)

router
.route("/change-password")
.post(verifyJWT,changeCurrentPassword)

router
.route("/get-current-user")
.get(verifyJWT,getCurrentUser)

router
.route("/updateaccount")
.patch(verifyJWT,updateAccountdetail)


export {router}