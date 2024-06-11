import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ForumHome from '../pages/Forum';
import ForumMy from '../pages/ForumMy';
import ForumCreate from '../pages/ForumCreate';
import ForumGroup from '../pages/ForumGroup';
import ForumDetail from '../pages/ForumDetail';

function ForumRoutes() {
    return (
        <Routes>
        <Route path="/" element={<ForumHome />} />
        <Route path="/myforums" element={<ForumMy />} />
        <Route path="/createforum" element={<ForumCreate />} />
        <Route path="/forumgroup" element={<ForumGroup />} />
        <Route path="/forumdetail/:id" element={<ForumDetail />} />
        </Routes>
    );
    }

export default ForumRoutes;