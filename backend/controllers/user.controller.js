const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
  
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage=multer.memoryStorage();
const upload = multer(({storage})).single('avatar');

const createUser = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ msg: 'Error uploading file' });
      } else if (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ msg: 'Unexpected error' });
      }
    
      const { fullName, userName, email, password } = req.body;
      let avatarUrl = 'default_avatar_url.jpg'; 

      if (req.file) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ public_id: "profile-avatar" }, (err, result) => {
              if (err) reject(err);
              else resolve(result.url);
            }).end(req.file.buffer);
          });
    
          avatarUrl = result; 
        } catch (error) {
          console.error('Error uploading file to Cloudinary:', error);
          return res.status(500).json({ msg: 'Error uploading file to Cloudinary' });
        }
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const newUser = await User.create({
        fullName,
        userName,
        email,
        password: hashedPassword,
        avatar: avatarUrl 
      });
    
      res.json({ message: "SignUp successful", user: newUser });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send("Server Error");
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
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ msg: 'Error uploading file' });
      } else if (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ msg: 'Unexpected error' });
      }
      const { _id, fullName, userName, avatar } = req.body;

      let user = await User.findById(_id);

      if (fullName) user.fullName = fullName;
      if (userName) user.userName = userName;
      if (req.file) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ public_id: "profile-avatar" }, (err, result) => {
              if (err) reject(err);
              else resolve(result.url);
            }).end(req.file.buffer);
          });
    
          user.avatar = result; 
        } catch (error) {
          console.error('Error uploading file to Cloudinary:', error);
          return res.status(500).json({ msg: 'Error uploading file to Cloudinary' });
        }
      }
      res.status(200).json( user );
      await user.save();
    })
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
