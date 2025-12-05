import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log("Connect thành công!")
    } catch (error) {
        console.error("Lỗi kết nối", error);
        process.exit(1);
    }
}