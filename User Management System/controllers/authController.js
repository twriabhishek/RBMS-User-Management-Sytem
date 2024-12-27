const bcrypt = require("bcrypt");
const logger = require("../logger/logger.js");
const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError.js");

//SignUp
exports.signup = catchAsyncError(async (req, res) => {
  const { name, email, password, role } = req.body;
  logger.info(`Signup attempt for email: ${email}`);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "User",
  });
  await user.save();
  logger.info(`User successfully registered with email: ${email}`);
  res.status(201).json({ message: "User registered successfully!" });
});

//Login
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email both
  logger.info(`Login attempt for email: ${email}`);

  if (!email || !password) {
    logger.warn(`Login attempt with missing credentials for email: ${email}`);
    return next(new ErrorHandler("Please Enter email and password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    logger.warn(`Login failed: Invalid email - ${email}`);
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.warn(`Login failed: Incorrect password for email - ${email}`);
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  logger.info(`User logged in successfully with email: ${email}`);
  
  sendToken(user, 200, res);
});
