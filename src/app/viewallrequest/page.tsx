"use client"
import { useState } from "react";
import "../globals.css";
import { requests } from "../data/request"
import UserMenu from "../components/UserMenu";
import RoleProtectedPage from "../components/roleprotectedPage";
import { users } from "../data/user";
import Pagination from "../components/Pagination";

type Request = {
    id: number,
    userID: number,
    title: string,
    status: string,
    description: string,   // 👈 thêm description vào type
    createdDate: string,
}

export default function UserMangement() {
    const getUser = (id: number) => users.find(u => u.id === id);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Tính toán dữ liệu hiển thị
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentRequests = requests.slice(indexOfFirst, indexOfLast);

    const [selectedRequestResponse, setSelectedRequestResponse] = useState<Request | null>(null);
    const [selectedRequestView, setSelectedRequestView] = useState<Request | null>(null); // 👈 modal view

    return (
        <>
            <RoleProtectedPage requiredRole="admin" redirectTo="/login" unauthorizedTo="/login">
                <div className=" mx-auto container py-5 ">
                    <UserMenu />
                </div>
                <div className="mt-10 my-3 border border-b-1 container mx-auto bg-black "></div>
                <div className="mx-20 font-semibold text-lg">DashBoard/ View All Request</div>

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
                    <tbody>
                        {currentRequests.map((request) => {
                            const user = getUser(request.userID); // lấy thông tin user theo userID
                            return (
                                <tr key={request.id}>
                                    <td className="px-4 py-2">{request.id}</td>
                                    <td className="px-4 py-2">
                                        <div>{user ? user.fullName : "Unknown"}</div>
                                        <div>{user ? user.email : "Unknown"}</div>
                                    </td>
                                    <td className="px-4 py-2">{request.title}</td>
                                    <td className="px-4 py-2">
                                        <div
                                            className={`font-semibold border rounded-md p-2 w-32 text-center
              ${request.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                                                    : "bg-green-100 text-green-700 border-green-400"
                                                }`}
                                        >
                                            {request.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{request.createdDate}</td>
                                    <td className="flex gap-5 px-4 py-2 ">
                                        <div
                                            className="bg-emerald-400 p-2 px-4 text-white rounded cursor-pointer"
                                            onClick={() => setSelectedRequestView(request)}
                                        >
                                            View
                                        </div>
                                        <div className="bg-rose-400 p-2 px-4 text-white rounded cursor-pointer">
                                            Remove
                                        </div>
                                        <div
                                            className="bg-slate-700 p-2 px-4 text-white rounded cursor-pointer"
                                            onClick={() => setSelectedRequestResponse(request)}
                                        >
                                            Response
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={requests.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />


                {/* --- MODAL RESPONSE --- */}
                {selectedRequestResponse && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                        <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-6 w-[420px]">
                            <div className="mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold">Response</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Request ID:{" "}
                                    <span className="font-semibold text-blue-600">
                                        #{selectedRequestResponse.id}
                                    </span>
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    defaultValue={selectedRequestResponse.title}
                                    className="w-full p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    placeholder="Type your response here..."
                                    className="w-full h-24 p-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow">
                                    Send
                                </button>
                                <button
                                    onClick={() => setSelectedRequestResponse(null)}
                                    className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MODAL VIEW --- */}
                {selectedRequestView && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                        <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-6 w-[420px]">
                            <div className="mb-4 border-b pb-2">
                                <h2 className="text-xl font-bold">View Request</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Request ID:{" "}
                                    <span className="font-semibold text-blue-600">
                                        #{selectedRequestView.id}
                                    </span>
                                </p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={selectedRequestView.title}
                                    disabled
                                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={selectedRequestView.description}
                                    disabled
                                    className="w-full h-32 p-2 rounded-md border border-gray-300 bg-gray-100"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedRequestView(null)}
                                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </RoleProtectedPage >
        </>
    )
}
