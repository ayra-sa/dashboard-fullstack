import User from "../models/UserModel";
import argon2 from "argon2";

export const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const logout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) return res.status(400).json({msg: "Can't logout"})
        res.status(200).json({msg: "You are logout"})
    })
}