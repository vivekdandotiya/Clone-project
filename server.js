import express from "express";

const app = express();

/* 👇 THIS IS THE KEY */
app.use(express.static("public"));

app.get("/products", async (req, res) => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
