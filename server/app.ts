import express from 'express';
import { SERVER } from './config/config.ts';
import menu from './controllers/menu.ts'
import ingredient from './controllers/ingredient.ts';
import orders from './controllers/order.ts';
import kitchen from './controllers/kitchen.ts';
import metrics from './controllers/metrics.ts';
import path from "path";

import cors from 'cors';
import distributorRoutes from './api/distributor/distributorRoutes.ts';

const app = express();

app.use(cors());

async function startServer() {

	try {
		console.log('Starting Express Application');
		const app = express();
		//CORS for front end API for ingredients

		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		// Database connection	
		console.log('Connect to the database');

		app.use('/', ingredient, kitchen, menu, orders, metrics, distributorRoutes);

		// Catch-all route for SPA - should be after API routes
			app.get("*", (req, res) => {
	res.sendFile(path.join("../../client/dist", "index.html"));
  });
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