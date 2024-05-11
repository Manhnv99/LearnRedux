import './App.css';
import CrudStudent from "./components/CrudStudent";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import GiaoVien from "./components/GiaoVien";
import SinhVien from "./components/SinhVien";

function App() {

    return(
        <Router>
            <Routes>
                <Route path="/" element={<CrudStudent/>} />
                <Route path="/gv" element={<GiaoVien/>} />
                <Route path="/sv" element={<SinhVien/>} />
            </Routes>
        </Router>
    )
}

export default App;
