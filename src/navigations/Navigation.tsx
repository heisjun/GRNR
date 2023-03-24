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
    MyFollowing,
    UpdatePhoto,
    MyFollower,
    MagazineDetails,
    KakaoLogin,
    RegisterProcess,
    UserFeed,
    UserPhoto,
    MyMagazine,
    MyProfileEdit,
    UserFollowing,
    UserFollower,
    UserScrapBook,
    UserScrapPhoto,
    UserScrapDictionary,
    UserScrapMagazine,
    MyAlarm,
    UserQuestion,
    UserMagazine,
    UpdateVideo,
    PersonalInformation,
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
                    <Route path="/community/video/edit" element={<UpdateVideo />} />
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
                    <Route path="/myalarm" element={<MyAlarm />} />
                    <Route path="/mypage" element={<Myfeed />} />
                    <Route path="/mypage/profile" element={<Myfeed />} />
                    <Route path="/mypage/profile/edit" element={<MyProfileEdit />} />
                    <Route path="/mypage/profile/myfeed" element={<Myfeed />} />
                    <Route path="/mypage/profile/following" element={<MyFollowing />} />
                    <Route path="/mypage/profile/follower" element={<MyFollower />} />
                    <Route path="/mypage/profile/photo" element={<Myphoto />} />
                    <Route path="/mypage/profile/magazine" element={<MyMagazine />} />
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
                    <Route path="/userpage/:id" element={<UserFeed />} />
                    <Route path="/userpage/photo/:id" element={<UserPhoto />} />
                    <Route path="/userpage/question/:id" element={<UserQuestion />} />
                    <Route path="/userpage/magazine/:id" element={<UserMagazine />} />
                    <Route path="/userpage/following/:id" element={<UserFollowing />} />
                    <Route path="/userpage/follower/:id" element={<UserFollower />} />
                    <Route path="/userpage/magazine" element={<MyMagazine />} />
                    <Route path="/userpage/question" element={<MyAnswer />} />
                    <Route path="/userpage/scrapbook/:id" element={<UserScrapBook />} />
                    <Route path="/userpage/scrapbook/photo/:id" element={<UserScrapPhoto />} />
                    <Route path="/userpage/scrapbook/magazine/:id" element={<UserScrapMagazine />} />
                    <Route path="/userpage/scrapbook/dictionary/:id" element={<UserScrapDictionary />} />
                    <Route path="/privacy" element={<PersonalInformation />} />
                </Routes>
            </HeaderBar>
        </Router>
    );
};

export default Navigation;
