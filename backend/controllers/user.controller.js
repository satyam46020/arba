const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/avatars'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } 
  }).single('avatar');
  
  const createUser = async (req, res) => {
    try {
      // Upload avatar photo
      upload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({ msg: 'Error uploading file' });
        } else if (err) {
          return res.status(500).json({ msg: err.message });
        }
  
        const { fullName, userName, email, password } = req.body;
        const avatar = req.file ? req.file.filename : ''; // Filename of uploaded avatar image
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = await User.create({
          fullName,
          userName,
          email,
          password: hashedPassword,
          avatar
        });
  
        res.json({ message: "SignUp successful", user: newUser });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret);

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const forgotPassword = async (req, res) => {
  //logic for forgot password
};

const updateProfile = async (req, res) => {
  const { fullName, avatar, password } = req.body;

  try {
    
    let user = await User.findById(req.user.id);

    if (fullName) user.fullName = fullName;
    if (avatar) user.avatar = avatar;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser,
  login,
  forgotPassword,
  updateProfile
};
