"use client"
import { useState } from "react";
import "../globals.css";
import { requests } from "../data/request"
type Request = {
    id: number,
    user: string,
    title: string,
    status: string,
    createdDate: string,
}
export default function UserMangement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // mặc định 5 / page

    const totalItems = requests.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirst, indexOfLast);

    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    return (
        <>
            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">View All Request</div>

            {/* --- TABLE --- */}
            <table className=" w-full container mx-auto my-10 text-lg">
                <thead >
                    <tr className="text-left ">
                        <th className=" border-b-2  border-gray-400 px-4 py-2"> ID</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">User/ Email </th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Title</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Status</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Created Date</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        currentRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="px-4 py-2">{request.id}</td>
                                <td className="px-4 py-2">{request.user}</td>
                                <td className="px-4 py-2">{request.title}</td>
                                <td className="px-4 py-2">
                                    <div className="bg-[rgb(236,254,255)] text-[rgb(3,105,161)] font-semibold border border-[rgb(6,182,212)] rounded-md p-2 w-32 text-center">
                                        {request.status}
                                    </div>
                                </td>
                                <td className="px-4 py-2">{request.createdDate}</td>
                                <td className="flex gap-5 px-4 py-2 ">
                                    <div className="bg-emerald-400 p-2 px-4 text-white rounded">View</div>
                                    <div className="bg-rose-400 p-2 px-4 text-white rounded">Remove</div>
                                    <div className="bg-slate-700 p-2 px-4 text-white rounded" onClick={() => setSelectedRequest(request)}>Response</div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* --- PAGINATION --- */}
            <div className="flex justify-between items-center container mx-auto my-10">
                {/* chọn số items per page */}
                <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="border rounded px-3 py-1"
                >
                    <option value={5}>5 / page</option>
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                </select>

                {/* range text */}
                <span>
                    {indexOfFirst + 1}-{Math.min(indexOfLast, totalItems)} / {totalItems}
                </span>

                {/* nút chuyển trang */}
                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx + 1}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-sky-500 text-white" : ""}`}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>
            </div>

            {selectedRequest && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Box */}
                    <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-6 w-[420px]">
                        {/* Header */}
                        <div className="mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold">Response</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Request ID:{" "}
                                <span className="font-semibold text-blue-600">
                                    #{selectedRequest.id}
                                </span>
                            </p>
                        </div>

                        {/* Input Title */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                defaultValue={selectedRequest.title}
                                className="w-full p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Input Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                placeholder="Type your response here..."
                                className="w-full h-24 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow"
                            >
                                Send
                            </button>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
