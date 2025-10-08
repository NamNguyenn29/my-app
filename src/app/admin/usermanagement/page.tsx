"use client"
import { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import RoleProtectedPage from "@/components/roleprotectedPage";
import UserMenu from "@/components/UserMenu";
import Pagination from "@/components/Pagination";
import { User } from "@/types/User";
import { getUsers } from "@/api/api";
export default function UserMangement() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getUsers().then(setUsers);
    }, [])

    let count = 1;


    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const totalUsers = users.length;
    const activeCount = users.filter(u => u.isActive && !u.isDeleted).length;
    const inactiveCount = users.filter(u => !u.isActive && !u.isDeleted).length;
    const deletedCount = users.filter(u => !u.isActive && u.isDeleted).length;

    const getDisplayStatus = (user: User) => {
        if (user.isDeleted) return "deleted";      // ưu tiên Deleted
        if (user.isActive) return "active";       // nếu active và chưa deleted
        return "inactive";                         // không active và chưa deleted
    }



    const getStatusStyles = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-700 border-green-400";
            case "inactive":
                return "bg-yellow-100 text-yellow-700 border-yellow-400";
            case "deleted":
                return "bg-red-100 text-red-700 border-red-400";
            default:
                return "bg-gray-100 text-gray-700 border-gray-400";
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive" | "deleted">("all");
    const [searchTerm, setSearchTerm] = useState("");

    // const filteredByStatus = activeFilter === "all" ? users : users.filter(u => u.status === activeFilter);

    // const filteredUsers = filteredByStatus.filter((u) => {
    //     if (!searchTerm.trim()) return true;
    //     const name = u.fullName || "";
    //     const email = u.email || "";
    //     const role = u.roles.toString() || "";
    //     const id = u.id.toString();

    //     return (
    //         name.includes(searchTerm) ||
    //         email.includes(searchTerm) ||
    //         role.includes(searchTerm) ||
    //         id.includes(searchTerm)

    //     )
    // })
    // Tính toán dữ liệu hiển thị
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    // const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const handleFilterClick = (filter: "all" | "active" | "inactive" | "deleted") => {
        setActiveFilter(filter);
        setCurrentPage(1);
    }


    return (
        <RoleProtectedPage requiredRole="Admin" redirectTo="/login" unauthorizedTo="/login">
            <div className=" mx-auto container py-5 ">
                <UserMenu />
            </div>
            <div className="mt-10 my-3 border border-b-1 container mx-auto bg-black "></div>
            <div className="mx-20 font-semibold text-lg">DashBoard/ User Mangement</div>
            {/* Search */}
            <div className="flex justify-start gap-5 p-2  container mx-20 mb-10">
                <input
                    type="search"
                    placeholder="Search by id,name , email, role"
                    className="w-96 border p-2  rounded-md "
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset về page 1 khi search
                    }}
                />
            </div>
            {/* Summary box */}
            <div className="flex gap-5 container mx-auto mb-10">
                <div
                    onClick={() => handleFilterClick("all")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-64 transition
                        ${activeFilter === "all" ? "bg-blue-100 border-blue-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-blue-300 rounded-full inline-block "></span>
                        <span className="inline-block w-32">Total User</span>
                    </div>
                    <span className="text-xl font-bold">{totalUsers}</span>
                </div>

                <div
                    onClick={() => handleFilterClick("active")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === "active" ? "bg-green-100 border-green-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-green-300 rounded-full inline-block "></span>
                        <span>active</span>
                    </div>
                    <span className="text-xl font-bold">{activeCount}</span>
                </div>

                <div
                    onClick={() => handleFilterClick("inactive")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === "inactive" ? "bg-yellow-100 border-yellow-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-300 rounded-full inline-block "></span>
                        <span>Inactive</span>
                    </div>
                    <span className="text-xl font-bold">{inactiveCount}</span>
                </div>

                <div
                    onClick={() => handleFilterClick("deleted")}
                    className={`cursor-pointer flex flex-col items-center gap-2 border rounded-lg px-10 py-5 w-40 transition
                        ${activeFilter === "deleted" ? "bg-red-100 border-red-500" : "hover:bg-gray-50"}`}
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-rose-300 rounded-full inline-block "></span>
                        <span>Deleted</span>
                    </div>
                    <span className="text-xl font-bold">{deletedCount}</span>
                </div>


            </div>
            {/* Table */}
            <table className=" w-full container mx-auto my-10 text-lg">
                <thead >
                    <tr className="text-left ">
                        <th className=" border-b-2  border-gray-400 px-4 py-2">No</th>
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
                            <td className="px-4 py-2">{count++}</td>
                            <td className=" px-4 py-2">
                                <div className="font-semibold text-xl">{u.fullName}</div>
                                <div className="text-">{u.email}</div>
                            </td>
                            <td className=" px-4 py-2">{u.roles.toString()}</td>
                            <td className=" px-4 py-2 ">
                                <div className={`font-semibold border rounded-md p-3 w-24 text-center ${getStatusStyles(getDisplayStatus(u))}`}>
                                    {getDisplayStatus(u)}
                                </div>
                            </td>
                            <td className=" px-4 py-2">{u.createdDate}</td>
                            <td className=" px-4 py-2">{ }</td>
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
            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
            />

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
                                    {selectedUser.fullName.substring(0, 2).toUpperCase()}
                                </span>
                                <span className="mt-4">
                                    <div className="font-bold">{selectedUser.fullName}</div>
                                    <div>{selectedUser.email}</div>
                                    <div className="mt-4 px-3 py-2 rounded-full bg-green-300 w-24 text-center">
                                        {selectedUser.status}
                                    </div>

                                </span>
                                <div className="absolute top-50">
                                    <div className="flex gap-20">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">User ID</div>
                                            <div className="mb-5"> {selectedUser.id}</div>
                                            <div className="font-semibold text-sky-700 mb-2">Last login</div>
                                            <div className="mb-5"> {selectedUser.id}</div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Created Date</div>
                                            <div className="mb-5"> {selectedUser.createdDate}</div>
                                            <div className="font-semibold text-sky-700 mb-2">Date of Birth</div>
                                            <div className="mb-5"> {selectedUser.dateOfBirth}</div>
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
                                            <div className="mb-5" >{selectedUser.fullName}</div>
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
                                            <div className="mb-5" >{selectedUser.phone}</div>
                                        </div>
                                    </div>
                                    <div className="col-span-8 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Address</div>
                                            <div className="mb-5" >{ }</div>
                                        </div>
                                    </div>
                                    {/* <div className="col-span-4 ">
                                        <div>
                                            <div className="font-semibold text-sky-700 mb-2">Genders</div>
                                            <div className="mb-5" >{selectedUser.fullName}</div>
                                        </div>
                                    </div> */}

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




        </RoleProtectedPage>
    )
}