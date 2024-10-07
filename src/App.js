import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import SearchForm from "./components/SearchForm";
import Marksheet from "./components/Marksheet";
import Spinner from "./components/Spinner";
import Admin from "./components/Admin";


const ADMIN_PASSCODE = "0810"; // Define your passcode here

function App() {
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [totalMaxMarks, setTotalMaxMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleSearch = async (rollNumber) => {
    console.log(`Searching for roll number: ${rollNumber}`); // Debug log
    try {
      setLoading(true);
      const response = await axios.get(`https://result-management-eosin.vercel.app/api/v3/get/marks/${rollNumber}`);
      console.log('Response data:', response.data); // Debug log
      
      setStudent(response.data.student);
      setResults(response.data.results);
      setTotalMaxMarks(response.data.totalMaxMarks);
      setTotalMarks(response.data.totalMarks);
      setPercentage(response.data.percentage);
      setError(null); // Reset error state if request is successful

    } catch (err) {
      console.log('Error:', err); // Debug log
      setError("Student not found!");
      toast.error("Student not found");
      setStudent(null);
      setResults([]);
    }

    setLoading(false);
  };

  const handleAdminClick = (navigate) => {
    const passcode = prompt("Enter the admin passcode:");
    if (passcode === ADMIN_PASSCODE) {
      setIsAdminAuthenticated(true);
      navigate('/admin');
    } else {
      toast.error("Incorrect passcode");
    }
  };

  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home onAdminClick={handleAdminClick} />} />
          <Route path="/student" element={
            <div className="App bg-blue-100 min-h-screen p-4">
              <BackButton />
              <h1 className="font-bold lg:text-[2rem] sm:text-[2rem] text-center text-[#fbbf24] translate-y-2">
                TORNED EDUCATION ONLINE RESULTS
              </h1>
              <div className="lg:mt-[2rem] sm:mt-[1.5rem] mt-[0.7rem]">
                <SearchForm onSearch={handleSearch} />
                <div className="errorContainer">
                  {error && <p className="error text-[#fde68a] text-[2.2rem] font-bold">{error}</p>}
                </div>
              </div>
              {loading ? (<Spinner />) : (
                <div className="lg:mt-[1.7rem] sm:min-w-[400px]">
                  {student && <Marksheet student={student} results={results} totalMarks={totalMarks}
                    totalMaxMarks={totalMaxMarks} percentage={percentage} />}
                </div>
              )}
            </div>
          } />
          <Route path="/admin" element={
            isAdminAuthenticated ? (
              <div className="App bg-green-100 min-h-screen p-4">
                <BackButton />
                <Admin />
              </div>
            ) : (
              <Unauthorized />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/')} className="mb-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
      Back
    </button>
  );
};

const Home = ({ onAdminClick }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Torned Education Online Results</h1>
      <div className="flex space-x-4">
        <Link to="/student" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Student Results</Link>
        <button onClick={() => onAdminClick(navigate)} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Admin Panel</button>
      </div>
    </div>
  );
};

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-3xl font-bold mb-6 text-red-500">Unauthorized Access</h1>
      <p className="text-lg text-gray-700">You do not have access to this page. Please enter the correct passcode.</p>
    </div>
  );
};

export default App;