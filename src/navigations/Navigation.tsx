import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderBar } from 'domains/HeaderBar';

const Navigation: React.FC = () => {
    return (
        <Router>
            <HeaderBar>
                <Routes>
                    <Route path="/*" element={null} />
                    <Route />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
