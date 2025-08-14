import User from '../models/user.js'
import { hashPassword, comparePassword } from '../utils/auth.js'

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
