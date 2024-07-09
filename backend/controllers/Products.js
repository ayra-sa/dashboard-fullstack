import { Op } from "sequelize";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

// product can accessed by admin and user
// admin can access all products
// user can only access product itself

export const getProducts = async (req, res) => {
  try {
    let response;
    // req.role came from middleware
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        // include user at table product, because relation between product and user
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data not found" });
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          // id, because got the id from the product
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [
            {
              id: product.id,
            },
            {
              userId: req.userId,
            },
          ],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Product.create({
      name,
      price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const updateProduct = async (req, res) => {
//     try {
//         const product = await Product.findOne({
//           where: {
//             uuid: req.params.id,
//           },
//         });
//         if (!product) return res.status(404).json({ msg: "Data not found" });
        
//         res.status(200).json(response);
//       } catch (error) {
//         res.status(500).json({ msg: error.message });
//       }
// }