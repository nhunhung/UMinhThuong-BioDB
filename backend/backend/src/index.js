const { swaggerSpec, swaggerUi } = require('./config/swagger');
const hostname = '127.0.0.1';
const express = require('express');
const port = 3001;
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const sequelize = require('./config/connectdb');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// require import table
const Role = require('./models/RoleModel');
const Users = require('./models/UsersModel');
const Provinces = require('./models/ProvincesModel');
const Districts = require('./models/DistrictsModel');
const Class = require('./models/ClassModel');
const ConservationStatus = require('./models/ConservationStatusModel');
const Family = require('./models/FamilyModel');
const Genus = require('./models/GenusModel');
const GroupOfOrganisms = require('./models/GroupOfOrganismsModel');
const Kingdom = require('./models/KingdomModel');
const Sample = require('./models/SampleModel');
const LocationSample = require('./models/LocationSampleModel');
const Organism = require('./models/OrganismModel');
const Identification = require('./models/IdentificationModel')
const Orders = require('./models/OrdersModel');
const Phylum = require('./models/PhylumModel');
const Wards = require('./models/WardsModel');

const Language = require('./models/LanguageModel');
const SearchHistory = require('./models/SearchHistory');
const Message = require('./models/MessageModel');
const FileUpLoad = require('./models/FileUploadModel');
// CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'http://192.168.145.1:3000'];

app.use(cors({
    origin: (origin, callback) => {
        // Kiểm tra nếu origin nằm trong danh sách allowedOrigins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Cho phép yêu cầu
        } else {
            callback(new Error('Not allowed by CORS')); // Từ chối yêu cầu
        }
    },
    methods: 'GET,POST,PUT,DELETE',  // Allow HTTP methods
    allowedHeaders: 'Content-Type,Authorization'  // Allow these headers
}));

require('events').setMaxListeners(20); // Tăng giới hạn lên 20 (hoặc giá trị phù hợp)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app._router.stack.forEach((middleware) => {
    if (middleware.route) { // nếu middleware có route
      console.log(`${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    }
  });
  
// app.use(fileUpload());


// const db = require("./config/database");
app.get('/', (req, res) => {
    res.send('hello world');
});

// Middleware cho các route chung
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Tạo route /api/uploadImage và chỉ sử dụng middleware cần thiết cho nó
app.use('/api/uploadImage', fileUpload());
app.use('/api/uploadImage', bodyParser.json({ limit: '50mb' }));
app.use('/api/uploadImage', bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/uploadImage', cookieParser());

routes(app);

(async () => {

    try {
        // await sequelize.sync({ force: true }); // Sử dụng `force: true` để xóa và tạo lại bảng, nếu cần
        await sequelize.sync();
        console.log('Database synchronized!');
    } catch (error) {


        console.error('Error synchronizing the database:', error);
    }
})();
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});