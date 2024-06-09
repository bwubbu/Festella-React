import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/vendors");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors", error);
      }
    };
    fetchVendors();
  }, []);

  const addVendor = async (vendor) => {
    try {
      const response = await axios.post("http://localhost:5000/vendors/register", vendor);
      setVendors([...vendors, response.data]);
    } catch (error) {
      console.error("Error adding vendor", error);
    }
  };

  const bookVendor = async (vendorId, booking) => {
    try {
      const response = await axios.post(`http://localhost:5000/vendors/${vendorId}/book`, booking);
      const updatedVendors = vendors.map((vendor) => {
        if (vendor._id === vendorId) {
          return response.data;
        }
        return vendor;
      });
      setVendors(updatedVendors);
    } catch (error) {
      console.error("Error booking vendor", error);
    }
  };

  return (
    <VendorContext.Provider value={{ vendors, addVendor, bookVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendors = () => useContext(VendorContext);