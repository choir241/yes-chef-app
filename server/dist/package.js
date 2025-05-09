// server/package.json
var type = "module";
var description = "Smart Restaraunt Management System";
var contributors = [
  {
    name: "Elder",
    url: "https://github.com/elderheim"
  },
  {
    name: "Nikki",
    url: "https://github.com/code-guppy"
  },
  {
    name: "Anton Shelkovnikov",
    url: "https://github.com/Antosha9108"
  },
  {
    name: "Megan McNeill",
    url: "https://github.com/bluethreadmade"
  },
  {
    name: "Jamal Hall",
    url: "https://github.com/JamalHall"
  },
  {
    name: "Richard Choi",
    url: "https://github.com/choir241"
  },
  {
    name: "Sarah A",
    url: "https://github.com/Sah11-0"
  },
  {
    name: "Thomas Harris",
    url: "https://github.com/LodenH16"
  },
  {
    name: "Tynon Johnson",
    url: "https://github.com/tdjohnson7"
  }
];
var name = "yes-chef";
var version = "0.0.0";
var scripts = {
  build: "tsup server/ --out-dir server/dist",
  start: "node dist/app.js",
  test: 'echo "Error: no test specified" && exit 1',
  dev: "node server/dist/app.js"
};
var dependencies = {
  "@tailwindcss/vite": "^4.0.9",
  "@tanstack/react-query": "^5.69.0",
  axios: "^1.8.2",
  cors: "^2.8.5",
  dotenv: "^16.4.7",
  express: "^4.21.2",
  mongodb: "^6.14.0",
  npm: "^11.1.0",
  tailwindcss: "^4.0.9"
};
var devDependencies = {
  "@types/cors": "^2.8.17",
  "@types/express": "^5.0.0",
  "@types/node": "^22.13.8",
  concurrently: "^9.1.2",
  nodemon: "^3.1.9",
  "ts-node": "^10.9.2",
  tsup: "^8.4.0",
  typescript: "^5.8.2"
};
var tsup = {
  entry: [
    "server",
    "!server/dist"
  ],
  splitting: false,
  clean: true,
  format: [
    "esm"
  ]
};
var package_default = {
  type,
  description,
  contributors,
  name,
  version,
  scripts,
  dependencies,
  devDependencies,
  tsup
};
export {
  contributors,
  package_default as default,
  dependencies,
  description,
  devDependencies,
  name,
  scripts,
  tsup,
  type,
  version
};
