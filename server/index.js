import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

// routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import purchaseRoutes from "./routes/purchase.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import vendorRoutes from "./routes/vendor.route.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

// assign routes to the app
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/vendor", vendorRoutes);

// for deployment
const __dirName = path.resolve();
// get the current working directory's parent directory
const rootDir = path.resolve(__dirName, "..");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDir, "/client/build")));
  app.get("*", (req, res) => {
    console.log(__dirName);
    res.sendFile(path.resolve(rootDir, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("The server is running in development mode.");
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
