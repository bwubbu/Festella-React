import { Routes, Route } from 'react-router-dom';

import Vendor from '../pages/Vendor';
import SearchVendor from '../pages/SearchVendor';
import RegisterVendor from '../pages/RegisterVendor';
import BookingVendor from '../pages/BookingVendor';

function VendorRoutes() {
  return (
    <Routes>
      <Route path="/vendor" element={<Vendor />} />
      <Route path="/vendor/search" element={<SearchVendor />} />
      <Route path="/vendor/register" element={<RegisterVendor />} />
      <Route path="/vendor/booking" element={<BookingVendor />} />
    </Routes>
  );
};

export default VendorRoutes;