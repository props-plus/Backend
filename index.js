require("dotenv").config();
const server = require("./server/server");
const port = process.env.PORT || 1337;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}!!!`);
});
