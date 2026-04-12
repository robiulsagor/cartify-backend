import mongoose from "mongoose";
import app from "./app.ts";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log("Connected to MongoDB"); 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);   
    })  
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});
