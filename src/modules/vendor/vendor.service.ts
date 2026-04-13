import Vendor from "./vendor.model.ts";
import User from "../user/user.model.ts";

export const applyForVendor = async (userId: string, data: any)=> {
    // check if already applied
    const existing = await Vendor.findOne({userId})
    if(existing) throw new Error('Already applied for vendor');

    //check if user exists
    const user = await User.findOne({ _id: userId });
    if(!user) throw new Error('User not found');

    const vendor = await Vendor.create({
        userId,
        ...data
    })

    return vendor;
}

export const approveVendor = async (vendorId: string)=>{
    const vendor = await Vendor.findById(vendorId);
    if(!vendor) throw new Error('Vendor not found');

    vendor.status = 'approved';
    await vendor.save();

    await User.findByIdAndUpdate(vendor.userId, {role: 'vendor'});
    return vendor;
}