import userModel from "../DB/modules/user.model.js";

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findByPk(req.body.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized - Admin access required" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Error checking permissions", error });
    }
}; 