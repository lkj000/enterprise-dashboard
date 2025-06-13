require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
const passportConfig = require("./config/passport-config")
const apiIntegrationRouter = require("./routes/api-integration")
const authRouter = require("./routes/auth")
const logRouter = require("./routes/log");
const dataRouter = require("./routes/data");
const feedbackRouter = require("./routes/feedback");
const appRouter = require("./routes/app");
const cookieParser = require("cookie-parser");
const { splitLargeFiles } = require('./helper/file_util');
const logger = require('./config/logger');

const app = express();

const cookieParserValue = "Xv9@Ld!7mZ#1w1";
const port = process.env.PORT || 3000; 
const reactDevelopmentServerUrl = 'http://localhost:3000';
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const reactServerUrl = isDevelopmentEnv ? reactDevelopmentServerUrl : '';

const corsOptions = {
  origin: reactServerUrl ? reactServerUrl : '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['X-Correlation-ID'],
};

app.use(cookieParser(cookieParserValue));

// Middleware for compression
app.use(compression());

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

passportConfig(passport);
app.use(passport.initialize());
//app.use(passport.session());

// Middleware to capture start time
app.use((req, res, next) => {
  res.locals.startTime = Date.now();
  next();
});

// Middleware to handle requests to the base URL
app.use((req, res, next) => {
  // If original url not starts with /static then log the request
  if (!req.originalUrl.startsWith('/static') && req.originalUrl !== '/albertsons-logo.png') {
    logger.info(`Request URL: ${req.originalUrl} from IP: ${req.ip} with method: ${req.method} and user: ${req.user ? req.user.username : 'anonymous'}`);
  }

  if (req.path === '/' || req.path === '/index.html') {
    res.redirect('/Home');
  } else {
    next();
  }
});


app.use("/", logRouter);
app.use("/", dataRouter);
app.use("/", apiIntegrationRouter);
app.use("/", authRouter);
app.use("/", feedbackRouter);
// This router must be at the last place because it has * path endpoint and it hanles react routers
app.use("/", appRouter);

// Temporarily loggin memory usage
function logMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  const log = {
      rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB',
      heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
      heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      external: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
  };

  logger.info(`Memory usage details, 
    rss: ${log['rss']}, 
    heapTotal: ${log['heapTotal']}, 
    heapUsed: ${log['heapUsed']}, 
    external: ${log['external']}`
  );
}

// Log memory every 10 seconds
setInterval(logMemoryUsage, 30000);

// Start the process
const startServer = async () => {
  // Split large files
  await splitLargeFiles();

  // Start the server
  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
};

startServer();
