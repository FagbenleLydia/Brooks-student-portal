const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { loadEmailTemplate } = require('../utils/emailTemplate');
const { sendEmail } = require('../utils/mailer');

exports.register = async (req, res) => {
    let session = null;

    try {
        const { firstName, lastName, email, password, role } = req.body;

        //start transaction session
        session = await mongoose.startSession();

        session.startTransaction();

        //create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role
        }, { session });

        //define replacements for email templates
        const replacements = {
            name: `${user.firstName} ${user.lastName}`,
            role: user.role.toUpperCase(),
            authUserId: user.authUserId
        }

        //load template
        const html = loadEmailTemplate('onboarding', replacements);

        //send email
        await sendEmail(user.email, 'WELCOME TO BROOKS STUDENT PROTAL', html);

        //commit session
        await session.commitTransaction();

        return res.status(201).json({
            success: true,
            message: 'User Created',
            data:  user[0]
        });
    } catch(error) {
        console.log(error);

        //abort session
        if(session) await session.abortTransaction();
        return res.status(500).json({ success: false, message: 'Failed to register user' });
    } finally {
        //end session
        if(session) await session.endSession();
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if existing user
        const existingUser = await User.findOne({ email: email });

        if(!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        //compare password
        const isMatch = await existingUser.matchPassword(password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        //sign token
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data:  existingUser,
            token: token
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to sign in user' });
    }
}

exports.profile = async(req, res) => {
    try {
        const { email } = req.user.email;

        //find user
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            data:  user
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch user profile' });
    }
}
