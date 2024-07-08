import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (res, req) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (res, req) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (res, req) => {
  const { name, password, confirmPassword, role, email } = req.body;

  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password does not match" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name,
      password: hashPassword,
      email,
      role,
    });
    res.status(201).json({ msg: "Register Success" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (res, req) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const { name, password, confirmPassword, role, email } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password does not match" });
  try {
    await User.update(
      {
        name,
        password: hashPassword,
        email,
        role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(201).json({ msg: "User updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (res, req) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
