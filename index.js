const express = require('express');
const router = require('./routes/router');
const authCheck = require('./middleware/auth');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://task-frontend-seven.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', router);

app.use(authCheck);

app.listen(5000, () => {
  console.log('server started at port 5000');
});
module.exports = app