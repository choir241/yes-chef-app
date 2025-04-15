import express from 'express';
import { SERVER } from './config/config.ts';
import menu from './controllers/menu.ts'
import ingredient from './controllers/ingredient.ts';
import orders from './controllers/order.ts';
import kitchen from './controllers/kitchen.ts';
import metrics from './controllers/metrics.ts';

import cors from 'cors';
import distributorRoutes from './api/distributor/distributorRoutes.ts';

const app = express();

const allowedOrigins =[
	"https://localhost:5173",
	"https://yes-chef-app.vercel.app"
];

app.use(
	cors({
		origin: (origin, callback) => {
			if(!origin || allowedOrigins.includes(origin)){
				callback(null, true);
			}else{
				callback(new Error("not allowed by CORS"))
			}
		},
		credentials: true,
	})
);

async function startServer() {

	try {
		console.log('Starting Express Application');
		const app = express();
		//CORS for front end API for ingredients
		app.use(cors())

		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		// Database connection	
		console.log('Connect to the database');

		app.use('/', ingredient, kitchen, menu, orders, metrics, distributorRoutes);

		await app.listen(process.env.PORT, () => {
			console.log(`The Server is running use ^c to chill server`);
			console.log(`Server started on ${SERVER.SERVER_HOSTNAME}:${process.env.PORT}`);
		});

		return app;
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

startServer();