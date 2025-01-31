import Role from '../models/Role'

export const createRole = async () => {
  
  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return

    const val = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'moderator' }).save(),
      new Role({ name: 'admin' }).save()
    ])
    
    console.log(val)
  } catch (error) {
    console.error(error)
  }
}