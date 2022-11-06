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
    WritingVideo,
    Myfeed,
    MyAnswer,
    ScrapBook,
    ScrapPhoto,
    ScrapMagazine,
    ScrapDictionary,
    Myphoto,
    Myplans,
    Myplants,
    DictionaryDetails,
    WritingQuestion,
    Login,
    QuestionDetails,
    UpdateQuestion,
    QuestionQuery,
    NotFound,
    MyFollowing,
    UpdatePhoto,
    MyFollower,
    MagazineDetails,
    KakaoLogin,
    RegisterProcess,
    UserFeed,
    UserPhoto,
} from 'pages';
import ScrollToTop from 'common/funcs';

const Navigation: React.FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <HeaderBar>
                <Routes>
                    <Route path="/upload" element={<WritingPicture />} />
                    <Route path="/upload/photo" element={<WritingPicture />} />
                    <Route path="/upload/video" element={<WritingVideo />} />
                    <Route path="/community/question/new" element={<WritingQuestion />} />
                    <Route path="/community/photo/edit" element={<UpdatePhoto />} />
                    <Route path="/" element={<Popular />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login/oauth2/token/gardener" element={<KakaoLogin />} />
                    <Route path="/community" element={<Popular />} />
                    <Route path="/community/popular" element={<Popular />} />
                    <Route path="/community/following" element={<Following />} />
                    <Route path="/community/following/keyword" element={<Keyword />} />
                    <Route path="/community/following/details" element={<PhotoDetails />} />
                    <Route path="/community/question" element={<Question />} />
                    <Route path="/community/question/:query" element={<QuestionQuery />} />
                    <Route path="/community/question/details/:id" element={<QuestionDetails />} />
                    <Route path="/community/question/new" element={<WritingQuestion />} />
                    <Route path="/community/question/edit" element={<UpdateQuestion />} />
                    <Route path="/community/photo" element={<Photo />} />
                    <Route path="/community/photo/details/:id" element={<PhotoDetails />} />
                    <Route path="/community/photo/edit" element={<UpdatePhoto />} />
                    <Route path="/community/magazine" element={<Magazine />} />
                    <Route path="/community/magazine/details/:id" element={<MagazineDetails />} />
                    <Route path="/community/dictionary" element={<Dictionary />} />
                    <Route path="/community/dictionary/details/:id" element={<DictionaryDetails />} />
                    <Route path="/register/oauth2/token/gardener" element={<RegisterProcess />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={<Myfeed />} />
                    <Route path="/mypage/profile" element={<Myfeed />} />
                    <Route path="/mypage/profile/myfeed" element={<Myfeed />} />
                    <Route path="/mypage/profile/following" element={<MyFollowing />} />
                    <Route path="/mypage/profile/follower" element={<MyFollower />} />
                    <Route path="/mypage/profile/photo" element={<Myphoto />} />
                    <Route path="/mypage/profile/magazine" element={null} />
                    <Route path="/mypage/profile/question" element={<MyAnswer />} />
                    <Route path="/mypage/profile/scrapbook" element={<ScrapBook />} />
                    <Route path="/mypage/profile/scrapbook/photo" element={<ScrapPhoto />} />
                    <Route path="/mypage/profile/scrapbook/magazine" element={<ScrapMagazine />} />
                    <Route path="/mypage/profile/scrapbook/dictionary" element={<ScrapDictionary />} />
                    <Route path="/mypage/profile/like" element={null} />
                    <Route path="/mypage/mygarden/" element={<Myplans />} />
                    <Route path="/mypage/mygarden/plans" element={<Myplans />} />
                    <Route path="/mypage/mygarden/plants" element={<Myplants />} />
                    <Route path="/mypage/setting" element={null} />
                    <Route path="/mypage/setting/setting1" element={null} />
                    <Route path="/userpage" element={<Login />} />
                    <Route path="/userpage/:id" element={<UserFeed />} />
                    <Route path="/userpage/photo/:id" element={<UserPhoto />} />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
