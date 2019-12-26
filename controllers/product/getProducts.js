const Product = require("../../models/product");
const Store = require("../../models/store");

async function getProducts(req, res) {
  try {
    const store = await Store.findOne({ seller: req.decodedToken.sub });

    const products = await Product.find({ storeId: store["_id"] });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

async function getOneProduct(req, res) {
  try {
    const product = await Product.findById(req.params.product_id);

    console.log("PRGP>>>>>>>", product, req.params.product_id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

module.exports = { getProducts, getOneProduct };
