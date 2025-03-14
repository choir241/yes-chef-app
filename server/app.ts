import express from 'express';
import { SERVER } from '../config/config.ts';
import menu from './controllers/menu.ts'
import ingredient from './controllers/ingredient.ts';
import orders from './controllers/order.ts';
import cors from 'cors';

const app = express();

const corsOptions = { origin: 'http://localhost:5173' }
app.use(cors(corsOptions))
const PORT = SERVER.SERVER_PORT;
async function startServer() {

	try {
		console.log('Starting Express Application');
		const app = express();
		//CORS for front end API for ingredients
		app.use(cors())

		app.use(cors());

		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		// Database connection	
		console.log('Connect to the database');

		app.use('/', ingredient);
		app.use('/', menu);
		app.use('/', orders);

		await app.listen(PORT, () => {
			console.log(`The Server is running use ^c to chill server`);
			console.log(`Server started on ${SERVER.SERVER_HOSTNAME}:${PORT}`);
		});

		return app;
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

startServer();