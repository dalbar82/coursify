import User from '../models/user.js'
import { hashPassword, comparePassword } from '../utils/auth.js'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body

		if (!name) return res.status(400).send('Name is required')
		if (!password || password.length < 8)
			return res
				.status(400)
				.send('No password detected or needs to be at least 8 characters long')
		let userExist = await User.findOne({ email }).exec()
		if (userExist) return res.status(400).send('Email in use')

		// hash password
		const hashedPassword = await hashPassword(password)

		//register
		const user = new User({
			name,
			email,
			password: hashedPassword,
		})
		await user.save()

		return res.json({ ok: true })
	} catch (error) {
		console.log(error)
		return res.status(400).send('Error, Try again')
	}
}
export const login = async (req, res) => {
	try {
		const { email, password } = req.body
		if (!password) return res.status(400).send('Please enter password')
		let user = await User.findOne({ email }).exec()
		if (!user) return res.status(400).send('Please register')

		// match password
		const matched = await comparePassword(password, user?.password)

		if (!matched) return res.status(400).send('Error, Try again')

		// 	// create JWT
		const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET, {
			expiresIn: '3d',
		})
		user.password = undefined

		res.cookie('token', token, {
			httpOnly: true,
			// secure: true
		})
		return res.json(user)
	} catch (error) {
		console.log(error)
		return res.status(400).send('Error, Try again')
	}
}

export const logout = async (req, res) => {
	try {
		res.clearCookie('token')
		return res.json({ message: 'Signout successful' })
	} catch (error) {
		console.log(error)
	}
}
