const swaggerAutogen = require("swagger-autogen");

const outputFile = "../swagger_output.json";
const endpointsFiles = ["../routers/index.router.ts"];
const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:3003",
  basePath: "/v1", // by default: '/'
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
