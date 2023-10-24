const swaggerAutogen = require("swagger-autogen");

const outputFile = "../swagger_output.json";
const endpointsFiles = ["../routers/auth.router.ts", "../routers/device.router.ts", "../routers/index.router.ts", "../routers/user.router.ts"];

swaggerAutogen(outputFile, endpointsFiles);
