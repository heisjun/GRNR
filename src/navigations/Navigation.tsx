import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderBar } from 'domains';
import {
    Popular,
    Following,
    Register,
    Magazine,
    Photo,
    Dictionary,
    Question,
    PhotoDetails,
    Keyword,
    WritingPicture,
    Myfeed,
    Myphoto,
} from 'pages';
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
                    <Route path="/community/following/keyword" element={<Keyword />} />
                    <Route path="/community/following/details" element={<PhotoDetails />} />
                    <Route path="/community/question" element={<Question />} />
                    <Route path="/community/photo" element={<Photo />} />
                    <Route path="/community/magazine" element={<Magazine />} />
                    <Route path="/community/dictionary" element={<Dictionary />} />
                    <Route path="/store" element={<Register />} />
                    <Route path="/store/menu1" element={<Following />} />
                    <Route path="/store/menu2" element={<Following />} />
                    <Route path="/store/menu3" element={<Following />} />
                    <Route path="/upload" element={<WritingPicture />} />
                    <Route path="/upload/photo" element={<WritingPicture />} />
                    <Route path="/upload/video" element={null} />
                    <Route path="/mypage" element={<Myfeed />} />
                    <Route path="/mypage/profile" element={<Myfeed />} />
                    <Route path="/mypage/profile/myfeed" element={<Myfeed />} />
                    <Route path="/mypage/profile/photo" element={<Myphoto />} />
                    <Route path="/mypage/profile/magazine" element={null} />
                    <Route path="/mypage/profile/question" element={null} />
                    <Route path="/mypage/profile/scrapbook" element={null} />
                    <Route path="/mypage/profile/like" element={null} />
                    <Route path="/mypage/setting" element={null} />
                    <Route path="/mypage/setting/setting1" element={null} />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
