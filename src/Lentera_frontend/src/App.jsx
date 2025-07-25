import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "./pages/user/auth/AuthPage";
import { AuthProvider, useAuth } from "./context/auth-context";
import EditProfile from "./pages/user/profile/EditProfile";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePage from "./pages/user/profile/ProfilePage";
import ProfileAnalytics from "./pages/user/profile/ProfileAnalytics";
import ListArticleAuthor from "./pages/user/articles/list-author-article";
import ListAllArticle from "./pages/user/public-page/article/list-all-article";
import UpdateThumbnailArticle from "./pages/user/articles/update-thumbnail-article";
import DetailArticle from "./pages/user/public-page/article/detail-article";
import ListAuthorCommunity from "./pages/user/community/list-author-community";
import CreateCommunity from "./pages/user/community/create-community";
import ListAllCommunity from "./pages/user/public-page/community/list-all-community";
import CommunityLayout from "./layouts/CommunityLayout";
import DetailCommunity from "./pages/user/public-page/community/detail-community";
import ListCommunityPost from "./pages/user/public-page/community/list-community-post";
import ArticleLayout from "./layouts/ArticleLayout";
import CreateArticle from "./pages/user/articles/create-article";
import ProfileJournal from "./pages/user/profile/ProfileJournal";
import CreateMoodPage from "./pages/journal/CreateMoodPage";
import CreateJournalPage from "./pages/journal/CreateJournalPage";
import LanternFlameSpinner from "./components/spinner/lamp-spinner";
import Homepage from "./pages/user/public-page/homepage/homepage";

function AppRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth()
  
  if (isLoading) return <LanternFlameSpinner />

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={user?.hasProfile ? "/" : "/edit-profile"} replace />
          ) : (
            <AuthPage />
          )
        }
      />

      <Route
        path="/homepage"
        element={
          isAuthenticated ? <Homepage /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/edit-profile"
        element={
          isAuthenticated ? <EditProfile /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/create-article"
        element={
          isAuthenticated ? <CreateArticle /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/update-thumbnail/:articleId"
        element={
          isAuthenticated ? <UpdateThumbnailArticle /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/create-community"
        element={
          isAuthenticated ? <CreateCommunity /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/detail-community/:id"
        element={
          <DetailCommunity />
        }
      />

      <Route path="/community" element={<CommunityLayout />}>
        <Route index element={<ListCommunityPost />} />
        <Route path="homepage" element={<ListCommunityPost />} />
        <Route path="discover" element={<ListAllCommunity />} />
      </Route>

      <Route path="/articles" element={<ArticleLayout />}>
        <Route index element={<ListAllArticle />} />
        <Route path="discover" element={<ListAllArticle />} />
        <Route path=":id" element={<DetailArticle />} />
      </Route>

      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="analytics" element={<ProfileAnalytics />} />
        <Route path="journals" element={<ProfileJournal />} />
        <Route path="articles" element={<ListArticleAuthor />} />
        <Route path="community" element={<ListAuthorCommunity />} />
      </Route>
      
      <Route
        path="/create-journal"
        element={
          isAuthenticated ? (
            <CreateMoodPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/create-journal/details"
        element={
          isAuthenticated ? (
            <CreateJournalPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

    </Routes>
  );
}

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
