import UserModel from "../../../models/userModel";
import responseHandler from "../../utils/responseHandler";

export async function profileManagementController(req, res) {
    const { name, email, image, about } = req.body;

    if (!email) return responseHandler(res, 400, false, "Email is required");
    if (!name && !image && !about) return responseHandler(res, 400, false, "At least one field (name, image, about) is required");

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return responseHandler(res, 404, false, "User not found");

        
        if (name) user.name = name;
        if (image) user.image = image;
        if (about) user.about = about;

        await user.save();

        return responseHandler(res, 200, true, "Profile updated successfully", user);
    } catch (error) {
        console.error("Error updating profile:", error)
    }
}