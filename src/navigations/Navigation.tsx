import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderBar } from 'domains';
import { Popular, Following, Register, Magazine, Photo, Dictionary } from 'pages';
import ScrollToTop from 'common/funcs';

const Navigation: React.FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <HeaderBar>
                <Routes>
                    <Route path="/*" element={<Popular />} />
                    <Route path="/community/popular" element={<Popular />} />
                    <Route path="/community/following" element={<Following />} />
                    <Route path="/community/photo" element={<Photo />} />
                    <Route path="/community/magazine" element={<Magazine />} />
                    <Route path="/community/dictionary" element={<Dictionary />} />
                    <Route path="/community/question" element={<Register />} />
                    <Route path="/store" element={<Following />} />
                    <Route path="/store/menu1" element={<Following />} />
                    <Route path="/store/menu2" element={<Following />} />
                    <Route path="/store/menu3" element={<Following />} />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
