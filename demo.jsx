'use client';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DEPARTMENT_OPTIONS = [
    'cse', 'eee', 'pharmacy', 'bba', 'english', 'law', 'canteen', 'hostel', 'others'
];
const ISSUE_TYPE_OPTIONS = [
    'bullying', 'harassment', 'discrimination', 'food-quality', 'infrastructure', 'academic-issues', 'other'
];
const STATUS_TYPE = ['new', 'in-progress', 'resolved'];
const REPORTS_PER_PAGE = 5;

function ReportsPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredReports, setFilteredReports] = useState([]);
    const [filters, setFilters] = useState({
        department: '', issueType: '', status: '', startDate: '', endDate: ''
    });
    const [selectedDate, setSelectedDate] = useState(null); // New state for selected date
    const [currentPage, setCurrentPage] = useState(1);

    const fetchReports = async () => {
        try {
            const response = await fetch('/api/get-reports');
            if (!response.ok) throw new Error('Failed to fetch reports');
            const data = await response.json();
            if (!data.success) throw new Error(data.message);
            setReports(data.message);
            setFilteredReports(data.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterReports = () => {
        let filtered = reports;
        if (filters.department) filtered = filtered.filter(report => report.department === filters.department);
        if (filters.issueType) filtered = filtered.filter(report => report.issueType === filters.issueType);
        if (filters.status) filtered = filtered.filter(report => report.status === filters.status);
        if (filters.startDate) filtered = filtered.filter(report => new Date(report.createdAt) >= new Date(filters.startDate));
        if (filters.endDate) filtered = filtered.filter(report => new Date(report.createdAt) <= new Date(filters.endDate));

        // Filter reports based on selected date
        if (selectedDate) {
            const selectedDateOnly = selectedDate.toDateString();
            filtered = filtered.filter(report => new Date(report.createdAt).toDateString() === selectedDateOnly);
        }

        setFilteredReports(filtered);
    };

    useEffect(() => { fetchReports(); }, []);
    useEffect(() => { filterReports(); }, [filters, reports, selectedDate]);

    const sortedFilteredReports = filteredReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const totalReports = sortedFilteredReports.length;
    const totalPages = Math.ceil(totalReports / REPORTS_PER_PAGE);
    const indexOfLastReport = currentPage * REPORTS_PER_PAGE;
    const indexOfFirstReport = indexOfLastReport - REPORTS_PER_PAGE;
    const currentReports = sortedFilteredReports.slice(indexOfFirstReport, indexOfLastReport);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen mx-auto p-4">
            <div className='container mx-auto'>
                <h1 className="text-2xl font-bold mb-4">Reports</h1>
                <div className="mb-4">
                    <label className="block mb-2">Department:
                        <select className="ml-2 p-1 border border-gray-300" value={filters.department}
                            onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                            <option value="">All Departments</option>
                            {DEPARTMENT_OPTIONS.map((department) => (
                                <option key={department} value={department}>{department}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2">Issue Type:
                        <select className="ml-2 p-1 border border-gray-300" value={filters.issueType}
                            onChange={(e) => setFilters({ ...filters, issueType: e.target.value })}>
                            <option value="">All Issue Types</option>
                            {ISSUE_TYPE_OPTIONS.map((issueType) => (
                                <option key={issueType} value={issueType}>{issueType}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2">Status:
                        <select className="ml-2 p-1 border border-gray-300" value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                            <option value="">All Statuses</option>
                            {STATUS_TYPE.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </label>
                    
                    {/* Date Picker for Specific Date */}
                    <label className="block mb-2">Select Date:
                        <DatePicker
                        
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date);
                                setCurrentPage(1); // Reset to the first page on date change
                            }}
                            className="ml-2 p-1 border border-gray-300"
                            placeholderText="Select a date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </label>
                </div>

                <table className="min-w-full bg-white border border-gray-300">
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
                        {currentReports.map((report) => (
                            <tr key={report.anonymousCode}>
                                <td className="border border-gray-300 p-2">{report.anonymousCode}</td>
                                <td className="border border-gray-300 p-2">{new Date(report.createdAt).toLocaleString()}</td>
                                <td className="border border-gray-300 p-2">{report.department}</td>
                                <td className="border border-gray-300 p-2">{new Date(report.occurrenceDate).toLocaleString()}</td>
                                <td className="border border-gray-300 p-2">{report.issueType}</td>
                                <td className="border border-gray-300 p-2">{report.status}</td>
                                <td className="border border-gray-300 p-2">{report.description}</td>
                                <td className="border border-gray-300 p-2">{report.messages.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="mr-2 p-1 bg-blue-500 text-white rounded disabled:bg-gray-400">Previous</button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-2 p-1 bg-blue-500 text-white rounded disabled:bg-gray-400">Next</button>
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;
