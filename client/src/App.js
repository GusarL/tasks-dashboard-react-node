import './App.css';
import {Layout} from './Layout';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import TaskPage from "./TaskPage";

const App: React.FC = () => {
    return (
        // <div className="App">
        //     <Layout/>
        // </div>
    <Router>
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/tasks/:taskId" element={<TaskPage />} />
        </Routes>
    </Router>
    );

};

export default App;
