const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
          });
        res.status(201).json({ user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Email non trovata' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Password errata' });

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User
            .findByIdAndUpdate(id, req.body)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const updatedUser = await User.findById(id)
        res.status(200).json({ user: updatedUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }


        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

