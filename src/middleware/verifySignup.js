import User from '../models/User'
import { ROLES } from '../models/Role'

const checkExistEmail = async (req, res, next) => {
  try {
    const email = await User.findOne({ email: req.body.email })

    if (email) {
      return res.status(400).json({ message: 'The email already exists' })
    }

    next()
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {

    const undef = req.body.roles.filter((rol) => !ROLES.includes(rol))

    if (undef.length) {
      return res.status(400).json({
        message: `Roles ${undef} does not exist`,
      })
    } 

    next()
  } else {
    next()
  }
}

export { checkExistEmail, checkRolesExisted }