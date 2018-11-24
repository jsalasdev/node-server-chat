import Server from "./classes/server";
import router from "./routes/router";
import bodyParser = require("body-parser");
import cors from 'cors';

const server = Server.instance;

//Bodyparser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({origin:true, credentials:true }));

server.app.use('/', router);

server.start(() => {
    console.log(`Server corriendo en el puerto ${server.port}`);
});
