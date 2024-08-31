import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify";

const AddEntry = () => {
  // State variables to manage form input values
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  // Hook to use navigate
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new entry object from the state
    const newEntry = { title, location, date, description };

    try {
      // Make a POST request to add the new entry using axios
      const response = await axios.post(
        "http://localhost:5000/Travel_Journal",
        newEntry
      );

      if (response.status === 201) {
        // Check if the entry was successfully created
        toast.success("Successfully added entry!"); // Show success message
        navigate("/"); // Redirect to the All Entry page
      } else {
        toast.error("Failed to add entry."); // Show error message if the entry was not added
      }
    } catch (error) {
      console.error("Error adding entry:", error); // Log any errors to the console
      toast.error("An error occurred while adding the entry."); // Show error message
    }
  };

  return (
    <>
      {/* Navigation link to the All Entry page */}
      <div className="flex justify-end my-5 mx-5">
        <Link
          to="/"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          All Entry
        </Link>
      </div>

      {/* Form to add a new entry */}
      <form className="max-w-sm mx-auto mt-5" onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="140"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title"
            required
          />
        </div>

        {/* Location Input */}
        <div className="mb-5">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength="140"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="location"
            required
          />
        </div>

        {/* Date Input */}
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="date"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="140"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Entry
        </button>
      </form>
    </>
  );
};

export default AddEntry;
