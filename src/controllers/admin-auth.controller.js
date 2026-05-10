const User = require('../models/User');

exports.bootstrap = async (req, res) => {
    const existingAdmin = await User.exists({ role: 'admin' });

    if(existingAdmin) {
        return res.status(409).json({ message: 'Admin already exists' });
    }

    try {
        const defaultAdmin = await User.create({
            firstName: process.env.DEFAULT_FRISTNAME,
            lastName: DEFAULT_LASTNAME,
            email: DEFAULT_EMAIL,
            password: DEFAULT_PASSWORD,
            role: 'admin'
        });

        return res.status(201).json({
            success: true,
            message: 'Default Admin Created',
            data:  defaultAdmin
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to provision default ADMIN' });
    }
}


exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role
        });

        return res.status(201).json({
            success: true,
            message: 'User Created',
            data:  user
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to register user' });
    }
}
