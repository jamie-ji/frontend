import './App.css';
import "./styles.css";
import "./CollapsibleSideMenu.css";

import { BrowserRouter as Router, 
    Route, 
    Routes} from 'react-router-dom'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';

import Header from './components/Header';
import Slider from './components/Slider';

import PrivateRoutes from './utils/PrivateRoutes';

import { AuthProvider } from './context/AuthContext';
import FileUpload from './components/FileUpload';
import CollapsibleSideMenu from './components/CollapsibleSideMenu';


function App() {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                <Header />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<HomePage />} path="/" exact/>
                        <Route element={<FileUpload />} path="/upload"/>
                    </Route>
                    <Route element={<LoginPage />} path="/login"/>
                </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
