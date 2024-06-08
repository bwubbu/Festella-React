import { Routes, Route } from 'react-router-dom';

import Vendor from '../pages/Vendor';
import SearchVendor from '../pages/SearchVendor';
import RegisterVendor from '../pages/RegisterVendor';
import BookingVendor from '../pages/BookingVendor';

function VendorRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Vendor />} />
      <Route path="/search" element={<SearchVendor />} />
      <Route path="/register" element={<RegisterVendor />} />
      <Route path="/booking" element={<BookingVendor />} />
    </Routes>
  );
};

export default VendorRoutes;