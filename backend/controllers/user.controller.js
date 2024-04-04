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
      res.status(500).send(error);
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
    res.status(500).send(error);
  }
};

const emailVerification = async (req, res) => {
  try {
    const {email} = req.body;
    let user = await User.findOne({email});
    console.log(user)
    res.status(200).send(user._id)
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const {_id, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findByIdAndUpdate( _id, { password : hashedPassword }, {new : true});
    
    res.send(user.password)
    
  } catch (error) {
    res.status(500).send(error);
  }
}

const updateProfile = async (req, res) => {
  const { fullName, password, avatar } = req.body;

  try {
    let {userId} = req;
    let user = await User.findById(userId);

    if (fullName) user.fullName = fullName;
    if (avatar) user.avatar = avatar;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    res.status(200).json( user );
    await user.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  login,
  emailVerification,
  updatePassword,
  updateProfile
};
