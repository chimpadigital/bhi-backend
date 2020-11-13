import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { verifySignup } from '../middleware/index'

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})

router.post('/signin', authController.signin)
router.post('/signup', [verifySignup.checkExistEmail, verifySignup.checkRolesExisted], authController.signup)

export default router