// import mongoose from 'mongoose'
// require('dotenv').config()

// async function main() {
//     await mongoose.connect(`mongodb://mevzin:${process.env.DB_PASSWORD}@undefined/?replicaSet=atlas-tamwtz-shard-0&ssl=true&authSource=admin`)
//     console.log("Mongo DB Connect")
// }

// main().catch((err) => console.error(err))

// export { mongoose }
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI || 'your-default-mongo-uri';
        await mongoose.connect(mongoURI, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;