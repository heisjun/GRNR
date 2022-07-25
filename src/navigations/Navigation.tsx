import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderBar } from 'domains';
import { Popular } from 'pages';
const Navigation: React.FC = () => {
    return (
        <Router>
            <HeaderBar>
                <Routes>
                    <Route path="/*" element={<Popular />} />
                    <Route path="/community/popular" element={<Popular />} />
                    <Route path="/community/following" element={null} />
                    <Route path="/community/picture" element={null} />
                    <Route path="/community/magazine" element={null} />
                    <Route path="/community/dictionary" element={null} />
                    <Route path="/community/question" element={null} />
                    <Route path="/store" element={null} />
                    <Route path="/store/menu1" element={null} />
                    <Route path="/store/menu2" element={null} />
                    <Route path="/store/menu3" element={null} />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
