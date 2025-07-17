
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "./pages/user/auth/AuthPage";
import { AuthProvider, useAuth } from "./context/auth-context";
import EditProfile from "./pages/user/profile/EditProfile";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePage from "./pages/user/profile/ProfilePage";
import ProfileAnalytics from "./pages/user/profile/ProfileAnalytics";
import CreateArticle from './pages/user/articles/create-article';
import ListArticleAuthor from "./pages/user/articles/list-author-article";
import ListAllArticle from "./pages/user/public-page/article/list-all-article";
import UpdateThumbnailArticle from "./pages/user/articles/update-thumbnail-article";
import DetailArticle from "./pages/user/public-page/article/detail-article";
import ListAuthorCommunity from "./pages/user/community/list-author-community";
import CreateCommunity from "./pages/user/community/create-community";
import ListAllCommunity from "./pages/user/public-page/community/list-all-community";
import CommunityLayout from "./layouts/CommunityLayout";
import DetailCommunity from "./pages/user/public-page/community/detail-community";

function AppRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <p>Loading...</p>;
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
        path="/edit-profile"
        element={
          isAuthenticated ? <EditProfile /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/articles"
        element={
          isAuthenticated ? <ListAllArticle /> : <Navigate to="/login" replace />
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
        path="/detail-article/:id"
        element={
          isAuthenticated ? <DetailArticle /> : <Navigate to="/login" replace />
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
        <Route index element={<ListAllCommunity />} />
        {/* <Route path="discover" element={<ProfileAnalytics />} />
        <Route path="your-community" element={< />} /> */}
      </Route>

      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="analytics" element={<ProfileAnalytics />} />
        <Route path="articles" element={<ListArticleAuthor />} />
        <Route path="community" element={<ListAuthorCommunity />} />
      </Route>

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
