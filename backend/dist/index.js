"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = __importDefault(require("./swaggerOptions"));
const cors_1 = __importDefault(require("cors"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const meetingRoutes_1 = __importDefault(require("./routes/meetingRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use('/api/clients', authMiddleware_1.default, clientRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/projects', authMiddleware_1.default, projectRoutes_1.default);
app.use('/api/meetings', authMiddleware_1.default, meetingRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
