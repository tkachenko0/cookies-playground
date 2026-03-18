const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.listen(8282, () => console.log("Cross-site server running on port 8282"));
