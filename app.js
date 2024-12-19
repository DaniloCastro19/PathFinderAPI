import express from 'express'; 
import userRoutes from './src/api/routes/user.routes.js';
import mapRoutes from './src/api/routes/map.routes.js';
import obstacleRoutes from './src/api/routes/obstacle.routes.js';
import waypointRouter from './src/api/routes/waypoint.routes.js';
import routeRouter from './src/api/routes/route.routes.js';
import optimalPathRouter from './src/api/routes/optimalPath.routes.js';
import statsRoutes from './src/api/routes/stats.routes.js';
import displayRoutes from 'express-routemap';
import { syncDatabaseEntities } from './src/data/syncDatabaseEntities.js';
import httpErrorHandler from './src/api/middlewares/errorHandler.js';
import apiUsageTrack from './src/api/middlewares/apiUsageTrack.js';
import {logger} from './src/core/utils/logger.js';
const API_PREFIX = "api";

const PORT = 5000;

const app = express();

//Middlewares
syncDatabaseEntities();
app.use(express.json());
app.use(apiUsageTrack());

//Routes
app.use(`/${API_PREFIX}/users`, userRoutes);
app.use(`/${API_PREFIX}/maps`, mapRoutes);
app.use(`/${API_PREFIX}/obstacles`, obstacleRoutes);
app.use(`/${API_PREFIX}/waypoints`,waypointRouter);
app.use(`/${API_PREFIX}/routes`, routeRouter);
app.use(`/${API_PREFIX}/optimal_path`, optimalPathRouter);
app.use(`/${API_PREFIX}/stats`, statsRoutes);



// Error handling middleware
app.use(httpErrorHandler);

app.listen(PORT, () =>{
    displayRoutes(app);
    logger.info("App listening on port", PORT)
}); 

export default {app};