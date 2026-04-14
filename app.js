const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./utils/logger");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File is too large" });
  }
  if (error.message === "Only image files are allowed") {
    return res.status(400).json({ message: error.message });
  }
  return res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
