const { sendErrorResponse } = require("../helpers/send_error_response");
const bcrypt = require("bcrypt");
const User = require("../schemas/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const { userJwtService } = require("../services/jwt.service");
const { userMailService } = require("../services/mail.service");

const create = async (req, res) => {
  try {
    const data = req.body;

    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const activation_link = uuid.v4();
    const newUser = await User.create({
      ...data,
      password: hashedPassword,
      activation_link,
    });

    const link = `${config.get(
      "api_url"
    )}/api/users/activate/${activation_link}`;

    await userMailService.sendMail(data.email, link);

    res.status(201).send({ message: "New User added", newUser });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      is_active: user.is_active,
      is_creator: user.is_creator,
    };

    const tokens = userJwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("user_cookie_refresh_time"),
    });

    res.status(201).send({
      message: "Tizimga xush kelibsiz",
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  let { limit, offset } = req.query;
  try {
    limit = limit ? limit : 10;
    offset = offset ? offset : 1;

    const data = await User.find({})
      .limit(limit)
      .skip((offset - 1) * limit);

    res.status(200).send({ data });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send({ user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await User.findByIdAndDelete(id);

    res.status(200).send({ message: "User deleted", deletedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await User.findByIdAndUpdate(id, req.body);

    res.status(200).send({ message: "User updated", updatedItem });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const user = await User.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: "" },
      { new: true }
    );

    if (!user) {
      return res.status(400).send({ message: "Token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ user });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    await userJwtService.verifyRefreshToken(refreshToken);

    const user = await User.findOne({ refresh_token: refreshToken });

    if (!user) {
      return res.status(401).send({ message: "Refresh token topilmadi" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      is_active: user.is_active,
      is_expert: user.is_expert,
    };

    const tokens = userJwtService.generateTokens(payload);
    user.refresh_token = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("user_cookie_refresh_time"),
    });

    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    return sendErrorResponse(error, res);
  }
};

const userActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const user = await User.findOne({ activation_link: link });

    if (!user) {
      return res.status(400).send({ message: "Avtor link noto'g'ri" });
    }

    if (user.is_active) {
      return res.status(400).send({ message: "Avtor avval faollashtirilgan" });
    }

    user.is_active = true;
    await user.save();
    res.send({ message: "Avtor faollashtirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
  logoutUser,
  refreshUserToken,
  userActivate,
};
