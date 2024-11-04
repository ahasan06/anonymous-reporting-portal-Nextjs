import React, { useEffect, useState } from "react";
function ReportStatus() {
    const [totals, setTotals] = useState({});

    const fetchTotals = async () => {
        const response = await fetch('/api/report-stats');
        const data = await response.json();
        if (data.success) {
            setTotals(data.totals);
        }
    }

    useEffect(() => {
        fetchTotals();
    }, []);

    return (
        <>
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
        </>
    )
}

export default ReportStatus
