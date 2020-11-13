import User from '../models/User'
import Role from '../models/Role'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  const {
    nameAgency,
    nameSeller,
    address,
    phone,
    razonSocial,
    social,
    email,
    password,
    roles 
  } = req.body

  const newUser = new User({
    nameAgency,
    nameSeller,
    address,
    phone,
    razonSocial,
    social,
    email,
    password: await User.encryptPassword(password)
  })

  // set roles
  if (roles) {
    const searchRole = await Role.find({ name: { $in: roles } })
    newUser.roles = searchRole.map(({ _id }) => _id)
  } else {
    const role = await Role.findOne({ name: 'user' })
    newUser.roles = [role._id]
  }

  // set new user
  try {
    const userCreated = await newUser.save()

    const token = jwt.sign({ id: userCreated._id },
      process.env.SECRET_KEY,
      {
      expiresIn: 86400
    })

    res.status(200).json({ token, user: userCreated })
  } catch (error) {
    res.status(400).json({ token: null, message: 'fail write new user on DB' })
    console.log('fail write new user on DB', error)
  }
}

export const signin = async (req, res) => {
  // check email exist on db
  const user = await User.findOne({ email: req.body.email }).populate('roles')

  if (!user) {
    return res.status(200).json({
      token: null,
      message: 'email not found'
    })
  }

  // confirm same password
  const matchPassword = await User.comparePassword(
    req.body.password,
    user.password
  )

  if (!matchPassword) {
    return res.status(200).json({
      token: null,
      message: 'password fail'
    })
  }

  const token = jwt.sign({ id: user._id },
    process.env.SECRET_KEY, {
    expiresIn: 86400,
  })



  const _user = { ...user._doc }
  _user.roles = user.roles.map(({ name }) => name)
  
  const { password, createdAt, updatedAt, _id, ...sendUser } = _user

  res.json({ token, user: sendUser })
}