import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditEntry = () => {
  // State to store entry details and form loading status
  const [entry, setEntry] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Get the entry ID from URL params
  const { id } = useParams();
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch the entry details when the component mounts
  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Travel_Journal/${id}`
        );
        setEntry(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entry:", error);
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `http://localhost:5000/Travel_Journal/${id}`,
        entry
      );
      console.log(response, response.status);
      if (response.status === 200) {
        toast.success("Successfull updated entry");
        // Redirect to the entries list after successful update
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Entry</h1>
      {loading ? (
        // Show loading message while fetching data
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={entry.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={entry.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={entry.date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={entry.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? "Updating..." : "Update Entry"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditEntry;
