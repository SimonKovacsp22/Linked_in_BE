/** @format */
import UserModel from "../apis/users/models.js"

export const postUser = async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)

    const { _id } = await newUser.save()

    res.status(201).send({ id: _id })
  } catch (error) {
    next(error)
  }
}
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
}
export const getSingleUsers = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    if (user) {
      res.send(user)
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
}
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId, // WHO you want to modify
      req.body, // HOW you want to modify
      { new: true, runValidators: true } // OPTIONS. By default findByIdAndUpdate returns the record pre-modification. If you want to get back the newly update record you should use the option new: true
      // By default validation is off here --> runValidators: true
    )
    if (updatedUser) {
      res.send(updatedUser)
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId)
    if (deletedUser) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
}
