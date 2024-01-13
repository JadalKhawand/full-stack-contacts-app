"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const RegisterForm_1 = __importDefault(require("./components/RegisterForm"));
function App() {
    return (<div className="App">
      <RegisterForm_1.default />
    </div>);
}
exports.default = App;
