import express from 'express'
import { VerifyOTP } from '../controllers/otp-controller.js'
const router = express.Router()


router.post("/verifyOtp",VerifyOTP)

export default router