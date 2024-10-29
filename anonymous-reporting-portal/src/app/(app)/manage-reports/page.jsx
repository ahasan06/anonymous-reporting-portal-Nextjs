"use client";

import React, { useEffect, useState } from "react";
import { Library, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const DEPARTMENT_OPTIONS = [
    'cse', 'eee', 'pharmacy', 'bba', 'english', 'law', 'canteen', 'hostel', 'library', 'others'
];
const ISSUE_TYPE_OPTIONS = [
    'bullying', 'harassment', 'discrimination', 'food-quality', 'infrastructure', 'academic-issues', 'other'
];
const STATUS_TYPE = ['new', 'in-progress', 'resolved'];

const initialFilteredReports = {
    department: '', issueType: '', status: '', startDate: '', endDate: ''
}

const Page = () => {

    const [reports, setReports] = useState([]);
    const [totals, setTotals] = useState({});
    const [filteredReports, setFilteredReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(initialFilteredReports);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalReports, setTotalReports] = useState(0);
    const reportsPerPage = 5;
    const router = useRouter(); 
    const fetchReports = async (page = 1, limit = reportsPerPage) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/get-reports?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data.success) {
                setReports(data.message);
                setTotalReports(data.totalReports);
                toast.success("Reports fetched successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
            toast.error("Failed to fetch reports. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTotals = async () =>{
        const response = await fetch('/api/report-stats');
        const data = await response.json();
        if (data.success) {
            setTotals(data.totals);
        }
    }



    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filterReports = () => {
        let filtered = reports;

        if (filters.department) {
            filtered = filtered.filter(report => report.department === filters.department);
        }
        if (filters.issueType) {
            filtered = filtered.filter(report => report.issueType === filters.issueType);
        }
        if (filters.status) {
            filtered = filtered.filter(report => report.status === filters.status);
        }
        if (filters.startDate) {
            filtered = filtered.filter(report => new Date(report.occurrenceDate) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            filtered = filtered.filter(report => new Date(report.occurrenceDate) <= new Date(filters.endDate));
        }

        setFilteredReports(filtered);
    };


    useEffect(() => {
        fetchTotals();
    }, []);

    useEffect(() => {
        fetchReports(currentPage); 
    }, [currentPage]);

    useEffect(() => {
        filterReports();
    }, [filters, reports]);

    const totalPages = Math.ceil(totalReports / reportsPerPage) || 0;

    const handlePageChange = (pageNumber) => {

        if (pageNumber < 1 || pageNumber > totalPages) {
            return
        }
        setCurrentPage(pageNumber)
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="container mx-auto md:mt-20 flex flex-col gap-5">
                <div className="top-dashboard min-h-40 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="filter-dashboard w-full mb-10 md:mb-0 bg-slate-700 rounded-md shadow-md">
                        <h1 className="text-white text-lg p-2">Manage Filter Reports</h1>
                        <table className="w-full h-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-sm md:text-base">
                                    <th className="border border-gray-300 p-2">Department</th>
                                    <th className="border border-gray-300 p-2">Issue Type</th>
                                    <th className="border border-gray-300 p-2">Status</th>
                                    <th className="border border-gray-300 p-2">Select Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center text-sm md:text-base">
                                    <td className="border border-gray-300 p-2">
                                        <select
                                            className="w-full p-1 border border-gray-300"
                                            name="department"
                                            value={filters.department}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">All Departments</option>
                                            {DEPARTMENT_OPTIONS.map(department => (
                                                <option key={department} value={department}>
                                                    {department.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <select
                                            className="w-full p-1 border border-gray-300"
                                            name="issueType"
                                            value={filters.issueType}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Issue Type</option>
                                            {ISSUE_TYPE_OPTIONS.map(issue => (
                                                <option key={issue} value={issue}>
                                                    {issue.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <select
                                            className="w-full p-1 border border-gray-300"
                                            name="status"
                                            value={filters.status}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Status</option>
                                            {STATUS_TYPE.map(status => (
                                                <option key={status} value={status}>
                                                    {status.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 p-2 text-start flex flex-col gap-2 h-full">
                                        <label className="font-semibold">Start Date</label>
                                        <input
                                            name="startDate"
                                            type="date"
                                            className="p-1 border border-gray-300"
                                            value={filters.startDate}
                                            onChange={handleFilterChange}
                                        />
                                        <label className="font-semibold">End Date</label>
                                        <input
                                            name="endDate"
                                            type="date"
                                            className="p-1 border border-gray-300"
                                            value={filters.endDate}
                                            onChange={handleFilterChange}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="report-status bg-slate-700 rounded-md w-full shadow-md">
                        <h1 className="text-white text-lg p-2">Reports Status</h1>
                        <table className="w-full bg-white border h-full border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-sm md:text-base">
                                    <th className="border border-gray-300 p-2">Total Report</th>
                                    <th className="border border-gray-300 p-2">New Report</th>
                                    <th className="border border-gray-300 p-2">In-Progress</th>
                                    <th className="border border-gray-300 p-2">Solved</th>
                                 
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center text-sm md:text-base">
                                    <td className="border border-gray-300 p-2">{totals?.totalReports}</td>
                                    <td className="border border-gray-300 p-2">{totals?.newReports}</td>
                                    <td className="border border-gray-300 p-2">{totals?.inProgressReports}</td>
                                    <td className="border border-gray-300 p-2">{totals?.solvedReports}</td>
                           
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bottom-dashboard bg-slate-700 mt-10  rounded-md shadow-md">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="animate-spin h-10 w-10 text-white" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <h1 className="text-white text-lg p-2">Reports History</h1>
                            <table className="w-full bg-white border border-gray-300 text-sm md:text-base">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 p-2">Anonymous Code</th>
                                        <th className="border border-gray-300 p-2">Created At</th>
                                        <th className="border border-gray-300 p-2">Department</th>
                                        <th className="border border-gray-300 p-2">Occurrence Date</th>
                                        <th className="border border-gray-300 p-2">Issue Type</th>
                                        <th className="border border-gray-300 p-2">Status</th>
                                        <th className="border border-gray-300 p-2">Description</th>
                                        <th className="border border-gray-300 p-2">Messages</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.map((report, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 p-2 cursor-pointer"
                                             onClick={() => router.push(`/communicateWith-user?code=${report.anonymousCode}`)}
                                            >{report.anonymousCode}
                                            </td>

                                            
                                            <td className="border border-gray-300 p-2">{new Date(report.createdAt).toLocaleString()}</td>
                                            <td className="border border-gray-300 p-2">{report.department.toUpperCase()}</td>
                                            <td className="border border-gray-300 p-2">{new Date(report.occurrenceDate).toLocaleString()}</td>
                                            <td className="border border-gray-300 p-2">{report.issueType.toUpperCase()}</td>
                                            <td className="border border-gray-300 p-2">{report.status.toUpperCase()}</td>
                                            <td className="border border-gray-300 p-2">
                                                {report.description.split(' ').slice(0, 10).join(' ').substring(0, 50)}
                                                {report.description.split(' ').length > 10 ? '...' : ''}
                                            </td>
                                            <td className="border border-gray-300 p-2">{report.messages.length}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-center items-center gap-5 text-white m-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center"
                                >
                                    <FaArrowLeft className="mr-1" />
                                    Previous
                                </button>

                                {totalPages > 0 && [...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center"
                                >
                                    Next
                                    <FaArrowRight className="ml-1" />
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
