import products from "../../DB/modules/product.model.js";

export const getproducts = async(req, res, next) => {
    const allProduct = await products.findAll()
    try {
        return res.status(200).json({ msg: "done", allProduct });
    } catch (error) {
        return res.status(500).json({ msg: "error", error: error.message });
    }
}