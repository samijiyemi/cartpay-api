const express = require("express");
const app = express();

require("./db/config");

// allow json income request
app.use(express.json({ urlencoded: true }));

// import user route
const userRoutes = require("./routers/users");

// Import product route
const productRoutes = require("./routers/products");

// User Router Middleware
app.use("/users", userRoutes);

// Product Router Middleware
app.use("/products", productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server runing at port ${port}`);
});
