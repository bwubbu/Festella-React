import { Routes, Route } from 'react-router-dom';

import Browse from '../pages/Browse';
import Eventdetails from '../pages/Eventdetails';

function BrowseRoute() {
    return (
        <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/eventdetails" element={<Eventdetails />} />
        </Routes>
    );
}

export default BrowseRoute;
