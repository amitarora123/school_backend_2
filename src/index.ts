import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log("Server live at ", port);
});
