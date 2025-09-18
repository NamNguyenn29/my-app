"use client"
import { useState } from "react";
import "../globals.css";
import { Modal, Box, Button } from "@mui/material";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    createddate: string;
    lastlogin: string;
};
export default function UserMangement() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const users = [
        {
            id: 1,
            name: "Nguyen A",
            email: "a.nguyen@gmail.com",
            role: "admin",
            status: "active",
            createddate: "15/09/2025",
            lastlogin: "1 days ago",
        },
        {
            id: 2,
            name: "Nguyen B",
            email: "a.nguyen@gmail.com",
            role: "admin",
            status: "active",
            createddate: "15/09/2025",
            lastlogin: "1 days ago",
        },
        {
            id: 3,
            name: "Nguyen C",
            email: "a.nguyen@gmail.com",
            role: "admin",
            status: "active",
            createddate: "15/09/2025",
            lastlogin: "1 days ago",
        },
        {
            id: 4,
            name: "Nguyen D",
            email: "a.nguyen@gmail.com",
            role: "admin",
            status: "active",
            createddate: "15/09/2025",
            lastlogin: "1 days ago",
        },
    ]

    return (
        <>
            <div className="my-20 h-2 container mx-auto bg-black "></div>
            <form className="flex justify-start gap-5 p-2 w-96 container mx-20 mb-10">
                <input
                    type="search"
                    placeholder="Search by email, name, role ..."
                    className="flex-1 border p-2  rounded-md "
                />
                <button
                    type="submit"
                    className="bg-rose-500  text-white text-xl font-semibold  px-4 py-1  rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </form>
            <div className="flex gap-10 mx-auto container mb-10">
                <div className="ml-2 !bg-rose-500 text-white font-semibold px-4">All</div>
                <div className="ml-2 !bg-rose-500 text-white font-semibold px-4">Arrange: Created Date</div>
            </div>
            <table className=" w-full container mx-auto my-10 text-lg">
                <thead >
                    <tr className="text-left ">
                        <th className=" border-b-2  border-gray-400 px-4 py-2">User ID</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Name/ Email</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Role</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Status</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Created Date</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Last login</th>
                        <th className="border-b-2  border-gray-400 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td className="px-4 py-2">{u.id}</td>
                            <td className=" px-4 py-2">
                                <div className="font-semibold text-xl">{u.name}</div>
                                <div className="text-">{u.email}</div>
                            </td>
                            <td className=" px-4 py-2">{u.role}</td>
                            <td className=" px-4 py-2 ">
                                <div className="bg-[rgb(236,254,255)] text-[rgb(3,105,161)] font-semibold border border-[rgb(6,182,212)] rounded rounded-md p-3 w-24 text-center">{u.status}</div>
                            </td>
                            <td className=" px-4 py-2">{u.createddate}</td>
                            <td className=" px-4 py-2">{u.lastlogin}</td>
                            <td className="flex gap-5 px-4 py-2 ">
                                <div className="bg-emerald-400 p-3 px-5 text-white rounded rounded-(200px)" >Edit</div>
                                <div className="bg-rose-400 p-3 px-5 text-white rounded rounded-(200px)">Remove</div>
                                <div>
                                    <div className="bg-slate-700 p-3 px-5 text-white rounded rounded-(200px)" onClick={() => setSelectedUser(u)}>
                                        More Detail</div>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)}>
                <Box
                    sx={{
                        p: 4,
                        bgcolor: "rgb(100,116,139)",
                        borderRadius: 2,
                        width: 1400,
                        mx: "auto",
                        mt: 5,
                        maxHeight: "90vh",   // giới hạn chiều cao modal
                        overflowY: "auto",   // bật thanh cuộn dọc
                    }}
                >
                    {selectedUser && (
                        <div className="grid grid-cols-12 gap-10 text-xl">
                            <div className="rounded-lg col-span-5 bg-white p-10 h-100 flex gap-10 relative">
                                <span className="bg-[rgb(238,242,255)] h-15 w-15 rounded-full text-center text-xl/15">
                                    {selectedUser.name.substring(0, 2).toUpperCase()}
                                </span>
                                <span className="mt-4">
                                    <div className="font-bold">{selectedUser.name}</div>
                                    <div>{selectedUser.email}</div>
                                    <div className="mt-4 px-3 py-2 rounded-full bg-green-300 w-24 text-center">
                                        {selectedUser.status}
                                    </div>

                                </span>
                                <div className="absolute top-50">
                                    <div className="flex gap-20">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">User ID</div>
                                            <div className="mb-5"># {selectedUser.id}</div>
                                            <div className="font-semibold text-sky-700 mb-2">Last login</div>
                                            <div className="mb-5"># {selectedUser.id}</div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Created Date</div>
                                            <div className="mb-5"># {selectedUser.createddate}</div>
                                            <div className="font-semibold text-sky-700 mb-2">Date of Birth</div>
                                            <div className="mb-5"># {selectedUser.id}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-7 bg-white p-10 h-100 text-xl rounded">

                                <div className="text-sky-700 font-semibold text-2xl ">Personal Information</div>
                                <div className="grid grid-cols-12 mt-10">
                                    <div className="col-span-4 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Full Name</div>
                                            <div className="mb-5" >{selectedUser.name}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Email</div>
                                            <div className="mb-5" >{selectedUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Phone</div>
                                            <div className="mb-5" >{selectedUser.name}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-8 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Address</div>
                                            <div className="mb-5" >{selectedUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-4 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Genders</div>
                                            <div className="mb-5" >{selectedUser.name}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className=" col-start-6 col-span-7 bg-white p-10 h-60 text-xl rounded">b</div>
                        </div>
                    )}
                    <div className="flex justify-end mt-6">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setSelectedUser(null)}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>


        </>
    )
}