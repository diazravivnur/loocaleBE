const { Op } = require('sequelize');
const { User } = require('../../models');
const fs = require('fs');
const Boom = require('boom');
const validationHelper = require('../helpers/validationHelper');
const { generateOTP } = require('../helpers/otpHelper');
const { sendEmail, sendForgotPassToEmail } = require('../helpers/sendEmailHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRETKEY;
const jwt_decode = require('jwt-decode');
const { generatePassword } = require('../helpers/passwordHelper');

exports.addEmail = async (request, res) => {
  try {
    const { error } = validationHelper.addEmailValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const OTP = generateOTP();
    const email = request.body.email;
    //check Existing Users
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (
      // If user exists, has password, and isActive
      checkExistingUser &&
      checkExistingUser.password !== null &&
      checkExistingUser.isActive === true
    ) {
      return res.status(400).send(Boom.badRequest('Email Already Exist'));
    } else if (
      // user exists in db, but does not have pass or is not active
      checkExistingUser
    ) {
      sendEmail(email, OTP);
      await User.update(
        {
          OTP,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
          },
        }
      );
      res.send({
        status: 'success',
        message: 'YOUR OTP HAS BEEN SENT',
        data: {
          users: email,
        },
      });
    } else {
      // kalo di db gaada, maka create ke db, send otp
      sendEmail(email, OTP);
      await User.create({
        email,
        OTP,
      });
      res.send({
        status: 'success',
        message: 'Successfully Create User',
        data: {
          users: email,
        },
      });
    }
    //// kalo di db ada, tapi password masih null dan active nya masih false, maka resend otp, update otp di db
    //if (
    //  checkExistingUser &&
    //  checkExistingUser.password === null &&
    //  checkExistingUser.isActive === false
    //) {
    //  sendEmail(email, OTP);
    //  await user.update(
    //    {
    //      OTP,
    //    },
    //    {
    //      where: {
    //        email: { [Op.like]: `%${email}%` },
    //      },
    //    }
    //  );
    //  res.send({
    //    status: "success",
    //    message: "YOUR OTP HAS BEEN SENT",
    //    data: {
    //      users: email,
    //    },
    //  });
    //} else if (
    //  // kalo di db ada, password ada, dan isActive
    //  checkExistingUser &&
    //  checkExistingUser.password !== null &&
    //  checkExistingUser.isActive === true
    //) {
    //  return res.status(400).send(Boom.badRequest("Email Already Exist"));
    //} else {
    //  // kalo di db gaada, maka create ke db, send otp
    //  sendEmail(email, OTP);
    //  await user.create({
    //    email,
    //    OTP,
    //  });
    //  res.send({
    //    status: "success",
    //    message: "Successfully Create User",
    //    data: {
    //      users: email,
    //    },
    //  });
    //}
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.validateOTP = async (request, res) => {
  try {
    const { error } = validationHelper.OTPValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const email = request.body.email;
    const OTP = request.body.OTP;
    // validate otp
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });

    if (checkExistingUser.OTP === OTP) {
      User.update(
        {
          isActive: true,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
            OTP: { [Op.like]: `%${OTP}%` },
          },
        }
      );
    } else {
      return res.status(400).send(Boom.badRequest('OTP IS NOT VALID'));
    }

    res.send({
      status: 'success',
      message: 'Validate OTP is Success, you good to go',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.signUpForm = async (request, res) => {
  try {
    const { error } = validationHelper.updateUserDataValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const { email, full_name, user_name, password } = request.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    const checkExistingUserName = await User.findOne({
      where: {
        user_name: { [Op.like]: `%${user_name}%` },
      },
    });
    console.log('existing user', checkExistingUser);
    if (checkExistingUserName) {
      return res.status(400).send(Boom.badRequest('User Name Already Taken'));
    } else if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest('User Not Found'));
    } else {
      await User.update(
        {
          full_name,
          user_name,
          password: passwordHashed,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
          },
        }
      );
    }
    const token = jwt.sign(
      {
        id: checkExistingUser.id,
        email: checkExistingUser.email,
        user_name,
        full_name,
      },
      secretKey
    );
    res.send({
      statusCode: 200,
      message: 'Success',
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.validateUsername = async (request, res) => {
  try {
    const { error } = validationHelper.usernameValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const { user_name } = request.body;
    const checkExistingUserName = await User.findOne({
      where: {
        user_name: { [Op.like]: `%${user_name}%` },
      },
    });

    if (checkExistingUserName) {
      return res.status(400).send(Boom.badRequest('User Name Already Taken'));
    }
    res.send({
      statusCode: 200,
      message: 'Username Can Be Used',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.resendOTP = async (request, res) => {
  try {
    const { error } = validationHelper.addEmailValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }

    const email = request.body.email;
    const OTP = generateOTP();

    // validate user
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest('User Not Found'));
    } else if (checkExistingUser.isActive === false) {
      sendEmail(email, OTP);
      await user.update(
        {
          OTP,
        },
        {
          where: {
            email: { [Op.like]: `%${email}%` },
          },
        }
      );
    }

    res.send({
      status: 'success',
      message: 'Your new OTP Has Sent to Your Email ',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    res.send({
      status: 'success',
      data: {
        users: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.getUserDetail = async (req, res) => {
  const id = req.userId;

  try {
    const data = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!data) {
      return res.send({
        status: 'failed',
        message: 'data not found',
      });
    }

    res.status(200).send({
      status: 'success',
      data: { users: data },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await User.findOne({
      where: {
        id,
      },
    });

    if (users) {
      await User.destroy({
        where: {
          id,
        },
      });

      return res.status(200).send({
        status: 'success',
        message: 'delete success',
        data: {
          id,
        },
      });
    }
    res.status(404).send({
      status: 'failed',
      message: 'no data found',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const finduser = await User.findOne({ where: { id } });

    if (!finduser) {
      return res.send({
        status: 'failed',
        message: 'data not found',
      });
    }

    if (req.files) {
      var avatar = req.files.avatar[0].filename;
      fs.unlink(`uploads/${finduser.avatar}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    const datauser = {
      ...req.body,
      avatar,
    };

    await user.update(datauser, {
      where: { id },
    });

    const updateUser = await User.findOne({
      where: { id },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    });

    res.status(200).send({
      status: 'Success',
      data: {
        user: {
          fullName: updateUser.fullName,
          email: updateUser.email,
          phone: updateUser.phone,
          avatar: updateUser.avatar,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error ',
    });
  }
};

const validateUsernameOrEmail = async (email, username) => {
  let response;
  if (email) {
    response = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });

    return response;
  } else {
    response = await User.findOne({
      where: {
        user_name: { [Op.like]: `%${username}%` },
      },
    });
    console.log('masuk bawah');
    return response;
  }
};

exports.loginUser = async (request, res) => {
  try {
    const { email, password, username } = request.body;
    const { error } = validationHelper.loginValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error || error.details[0].message));
    }
    const response = await validateUsernameOrEmail(email, username);

    // if (checkExistingUserEmail === null && checkExistingUserName === null) {
    //   return res.status(400).send(Boom.badRequest('No User Found'));
    // } else if (checkExistingUserEmail.password === null || checkExistingUserName.password === null) {
    //   return res.status(400).send(Boom.badRequest("You haven't validate OTP yet"));
    // }

    const isValidPassword = await bcrypt.compare(password, response.password);

    if (!isValidPassword) {
      return res.status(400).send(Boom.badRequest("Email and Password don't match"));
    }
    console.log('response: ', response);

    const token = jwt.sign(
      {
        id: response.id,
        user_name: response.user_name,
        full_name: response.full_name,
        thumbnail: response.thumbnail,
      },
      secretKey
    );

    res.send({
      status: 'success',
      data: {
        user: {
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.signUpGoogle = async (request, res) => {
  try {
    const { clientID } = request.body;
    const { error } = validationHelper.signUpGoogleValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const decodedClientID = jwt_decode(clientID);

    const OTP = generateOTP();
    const email = decodedClientID.email;
    const full_name = decodedClientID.name;
    const user_name = (
      decodedClientID.given_name +
      decodedClientID.family_name +
      Date.now().toString().slice(-2)
    ).toLowerCase();
    //check Existing Users
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    let token;

    if (!checkExistingUser) {
      const createUser = await User.create({
        email,
        // generate random password biar kaya atlassian (kalo login via google, ya google only. gabisa login via input email biasa)
        password: generatePassword(),
        isActive: true,
        full_name: full_name,
        user_name: user_name,
      });
      token = jwt.sign(
        {
          id: createUser.id,
          full_name: createUser.full_name,
          user_name: createUser.user_name,
          thumbnail: '',
        },
        secretKey
      );
      res.send({
        status: 'success',
        message: 'Successfully Create User',
        data: {
          users: email,
          token,
        },
      });
    } else {
      token = jwt.sign(
        {
          id: checkExistingUser.id,
					full_name: checkExistingUser.full_name,
          user_name: checkExistingUser.user_name,
          thumbnail: checkExistingUser.thumbnail
        },
        secretKey
      );
      res.send({
        status: 'success',
        message: 'Logging user in',
        data: {
          users: email,
          token,
        },
      });
    }

    //// kalo di db ada, tapi password masih null dan active nya masih false, maka resend otp, update otp di db
    //if (
    //  checkExistingUser &&
    //  checkExistingUser.password === null &&
    //  checkExistingUser.isActive === false
    //) {
    //  sendEmail(email, OTP);
    //  await user.update(
    //    {
    //      OTP,
    //    },
    //    {
    //      where: {
    //        email: { [Op.like]: `%${email}%` },
    //      },
    //    }
    //  );
    //  res.send({
    //    status: "success",
    //    message: "YOUR OTP HAS BEEN SENT",
    //    data: {
    //      users: email,
    //    },
    //  });
    //} else if (
    //  // kalo di db ada, password ada, dan isActive
    //  checkExistingUser &&
    //  checkExistingUser.password === null &&
    //  checkExistingUser.isActive === true
    //) {
    //  return res.status(400).send(Boom.badRequest("Email Already Exist"));
    //} else {
    //  // kalo di db gaada, maka create ke db, send otp
    //  sendEmail(email, OTP);
    //  await user.create({
    //    email,
    //    OTP,
    //  });
    //  res.send({
    //    status: "success",
    //    message: "Successfully Create User",
    //    data: {
    //      users: email,
    //    },
    //  });
    //}
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.loginViaGoogle = async (request, res) => {
  try {
    const { clientID } = request.body;
    const { error } = validationHelper.signUpGoogleValidation(request.body);
    if (error) {
      return res.status(400).send(Boom.badRequest(error.details[0].message));
    }
    const decodedClientID = jwt_decode(clientID);
    const email = decodedClientID.email;
    // validate user
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest('No User Found'));
    }
    // else if (checkExistingUser.password === null) {
    //   return res
    //     .status(400)
    //     .send(Boom.badRequest("You haven't validate OTP yet"));
    // }

    const token = jwt.sign(
      {
        id: checkExistingUser.id,
        full_name: checkExistingUser.full_name,
        user_name: checkExistingUser.user_name,
        thumbnail: '',
      },
      secretKey
    );

    res.send({
      status: 'success',
      data: {
        user: {
          email: checkExistingUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.forgotPassword = async (request, res) => {
  try {
    const { email } = request.body;

    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${email}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest('No User Found'));
    }
    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign(
      {
        idUser: checkExistingUser.id,
        email: checkExistingUser.email,
      },
      secretKey
    );
    const linkReset = `http://localhost:3000/reset-password/${token}`;

    sendForgotPassToEmail(email, linkReset);

    res.send({
      status: 'success',
      message: 'Reset Password Email Has Been Sent',
      data: {
        user: {
          email: checkExistingUser.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.resetPassword = async (request, res) => {
  const { error } = validationHelper.resetPassValidation(request.body);
  if (error) {
    return res.status(400).send(Boom.badRequest(error));
  }

  try {
    const { email, password, token } = request.body;
    const passwordHashed = await bcrypt.hash(password, 10);

    const decodedToken = jwt_decode(token);
    const checkExistingUser = await User.findOne({
      where: {
        email: { [Op.like]: `%${decodedToken.email}%` },
        id: { [Op.like]: `%${decodedToken.idUser}%` },
      },
    });
    if (checkExistingUser === null) {
      return res.status(400).send(Boom.badRequest('No User Found'));
    }

    await User.update(
      {
        password: passwordHashed,
      },
      {
        where: {
          email: { [Op.like]: `%${decodedToken.email}%` },
          id: { [Op.like]: `%${decodedToken.idUser}%` },
        },
      }
    );

    res.send({
      status: 'success',
      message: 'Successfully Re Set Password',
      data: {
        user: {
          email: checkExistingUser.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'server error',
    });
  }
};
