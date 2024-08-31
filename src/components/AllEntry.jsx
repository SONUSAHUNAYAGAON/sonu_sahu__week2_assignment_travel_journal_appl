import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const AllEntry = () => {
  //hook to use usenavigate for redirect
  const navigate = useNavigate();
  // State to store the fetched entries, loading status, and modal visibility
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect hook to fetch entries from the server when the component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Travel_Journal"
        );
        setEntries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching entries:", error);
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Function to handle the deletion of an entry
  const handleDeleteEntry = async (id) => {
    // Show confirmation dialog with SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/Travel_Journal/${id}`);
        setEntries(entries.filter((entry) => entry.id !== id));
        toast.success("Entry deleted successfully!"); // Show success toast
      } catch (error) {
        console.error("Error deleting entry:", error);
        toast.error("There was a problem deleting the entry."); // Show error toast
      }
    }
  };

  //handle edit entry
  const handleEditEntry = async (id) => {
    // Show confirmation dialog with SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    });

    if (result.isConfirmed) {
      try {
        navigate(`/edit/${id}`);
      } catch (error) {
        console.error("Error edit entry:", error);
        toast.error("There was a problem deleting the entry."); // Show error toast
      }
    }
  };

  // Function to open the modal and set the selected entry
  const openModal = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  return (
    <>
      {/* Navigation link to the "Add Entry" page */}
      <div className="flex justify-end my-5 mx-5">
        <Link
          to="/add-entry"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Add Entry
        </Link>
      </div>

      {/* Container for the table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div>Loading...</div> // Show loading message while fetching data
        ) : entries.length === 0 ? (
          <div>No entries here, please add one...</div> // Show message if no entries are available
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* Table headers */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {entry.title}
                  </th>
                  <td className="px-6 py-4">{entry.location}</td>
                  <td className="px-6 py-4">{entry.date}</td>
                  <td className="px-6 py-4">{entry.description}</td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium m-1 text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => openModal(entry)} // Open modal with entry details
                    >
                      View
                    </button>
                    <button
                      className="font-medium m-1 text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEditEntry(entry.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="font-medium m-1 text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleDeleteEntry(entry.id)} // Call delete function with entry id
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for viewing entry details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Entry Details</h2>
            <p className="mb-2">
              <strong>Title:</strong> {selectedEntry.title}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {selectedEntry.location}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {selectedEntry.date}
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {selectedEntry.description}
            </p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast notifications container */}
      <ToastContainer />
    </>
  );
};

export default AllEntry;
