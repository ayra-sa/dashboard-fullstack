import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
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

export const createUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { name, password, confirmPassword, role, email } = req.body;

    // Validate passwords
    if (password && password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and Confirm Password do not match" });
    }

    // Hash the password if it has been changed
    const hashPassword = password ? await argon2.hash(password) : user.password;

    // Update user data
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

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
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
