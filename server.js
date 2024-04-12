const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRouter');
const { specs, swaggerUi } = require('./config/swagger');

dotenv.config();
const cors = require('cors');

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', authRoutes);
app.use('/file', fileRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
