import User from '../user/user.model.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        ...data,
        password: hashedPassword
    });
    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, role: user.role },
        process.env.JWT_SECRET as string, { expiresIn: '7d' });

         const userObj = user.toObject();

    // remove password
    const { password: _, ...userWithoutPassword } = userObj;


    return { token, user: userWithoutPassword };
}
