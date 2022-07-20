import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderBar } from 'domains/HeaderBar';
import { Home } from 'pages';
const Navigation: React.FC = () => {
    return (
        <Router>
            <HeaderBar>
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
