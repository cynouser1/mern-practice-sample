import React, { useState } from "react";
import UserProfileModal from "./UserProfileModal";
import { FaUserCircle } from "react-icons/fa";
import { updateProfile } from "../../api";
import { toast } from "react-toastify";

const UserProfileCard = ({ token, user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    address: {
      street: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const openModal = () => {
    setIsOpen(true);
    console.log("user", user);
    setFormData({
      name: user?.name || '',
      // email: user?.email || '',
      phone: user?.phone || '',
      designation: user?.designation || '',
      address: {
        street: user?.address?.street || '',
        landmark: user?.address?.landmark || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        pincode: user?.address?.pincode || '',
        country: user?.address?.country || '',
      },
    });

  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("name and value", name, value);
    // For nested fields like address.city or socialLinks.twitter
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      console.log("section and field", section, field);
      // Update the nested field in the formData state
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      console.log("formData", formData);
      // return ;
      const updateResponse = await updateProfile(formData);
      console.log("updateResponse", updateResponse);
      if (updateResponse.success) {
        setUser(updateResponse.data);
        toast.success(updateResponse.message);
      } else {
        // setUser(null);
        toast.error(updateResponse.message);
      }
    }
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <>
      <div className="space-y-6">
        {/* userMetaCard */}
        <div className="p-5 border border-gray-200 rounded-2xl text-left lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center lg:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full text-center">
                {/* <img src="/images/user/owner.jpg" alt="user" /> */}
                <FaUserCircle className="w-20 h-20 text-gray-500 hover:text-blue-600" />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800  xl:text-left">
                  {user?.name}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 ">{user?.designation}</p>
                  <div className="hidden h-3.5 w-px bg-gray-300  xl:block"></div>
                  <p className="text-sm text-gray-500 ">
                    {user?.address?.city}, {user?.address?.state},{" "}
                    {user?.address?.country}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={openModal}
              className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800  lg:inline-flex lg:w-auto"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                />
              </svg>
              Edit
            </button>
          </div>
        </div>

        {/* userInfoCard */}
        <div className="p-5 border border-gray-200 rounded-2xl text-left lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between  text-left">
            <div>
              <h4 className="text-lg font-semibold text-gray-800  lg:mb-6">
                Personal Information
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Full Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.name}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Email address
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.phone}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Designation
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.designation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* userAddressCard */}
        <div className="p-5 border border-gray-200 rounded-2xl text-left lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800  lg:mb-6">
                Address
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    House No./Street
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.address?.street}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Landmark/Colony
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.address?.landmark}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    City
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.address?.city}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    State
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.address?.state}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Pin Code
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.address?.pincode}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 ">
                    Country
                  </p>
                  <p className="text-sm font-medium text-gray-800 ">
                    {user?.address?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <UserProfileModal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4  lg:p-11">
          <div className="px-2 pr-14 text-left">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 ">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500  lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="">
                <h5 className="mb-5 text-lg font-medium text-gray-800 text-left lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  {/* <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="info@gmail.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div> */}
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Designation
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 text-left lg:mb-6">
                  Address
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      House No./Street
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your street"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Landmark/Colony
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your landmark/colony"
                        name="address.landmark"
                        value={formData.address.landmark}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      City
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your City"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      State
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your State"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Pin Code
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter your pincode"
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleChange}
                        minLength={4}
                        maxLength={8}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 text-left">
                      Country
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your country"
                        name="address.country"
                        value={formData.address.country}
                        onChange={handleChange}
                        className="h-11 w-full overflow-hidden rounded-lg border px-4 py-2.5 border-gray-300 bg-transparent text-sm text-gray-500 transition-colors placeholder:text-gray-400 focus:outline focus:outline-sky-500 focus:shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 px-4 py-3 text-sm gap-2 rounded-lg"
              >
                Close
              </button>
              <button
                type="submit"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 inline-flex items-center justify-center gap-2 rounded-lg transition bg-brand-500 text-white  hover:bg-brand-600  px-4 py-3 text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </UserProfileModal>
    </>
  );
};

export default UserProfileCard;
