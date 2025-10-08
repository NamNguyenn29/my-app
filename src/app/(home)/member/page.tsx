'use client'
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../../../context/authContext";
import UserMenu from "../../../components/UserMenu";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import { getUserByIdForUser } from "@/api/api";
export default function RootLayout() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
        if (currentUser) {
            setForm({
                email: currentUser.email || "",
                fullName: currentUser.fullName || "",
                dateOfBirth: currentUser.dateOfBirth || "",
                phone: currentUser.phone || "",
            });
        }
    }, [currentUser]);


    // Form state
    const [form, setForm] = useState({
        email: "",
        fullName: "",
        dateOfBirth: "",
        phone: "",
    });

    // Chế độ edit
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    useEffect(() => {
        if (!user) return; // nếu chưa có user thì thôi
        getUserByIdForUser().then(setCurrentUser);
    }, [user]);
    // Load data user ban đầu vào form
    ;

    if (!user) {
        return null; // hoặc spinner loading
    }

    const initials = user?.fullName
        ? user.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "?";

    // Handle change input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Save changes
    const handleSave = () => {
        // ✅ update localStorage để lần sau load lại vẫn giữ
        const updatedUser = { ...user, ...form };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        alert("Cập nhật thành công!");
    };

    // Cancel changes
    const handleCancel = () => {
        // reset về giá trị gốc trong user
        setForm({
            email: currentUser?.email || "",
            fullName: currentUser?.fullName || "",
            dateOfBirth: currentUser?.dateOfBirth || "",
            phone: currentUser?.phone || "",
        });
        setIsEditing(false);
    };

    return (
        <div>
            <div className=" mx-auto container py-5 ">
                <UserMenu />
            </div>
            <div className="text-center font-semibold text-3xl my-10">My Profile</div>
            <div className="w-380 h-2 bg-rose-500 mx-auto "></div>
            <div className="bg-[rgb(215,215,215)] grid grid-flow-col grid-cols-12 container mx-auto p-10 my-20">
                <div className="col-span-4">
                    <div className="text-2xl m-10 font-bold">Account Information</div>
                    <div className="rounded rounded-full w-30 bg-white h-30 ml-20">
                        <div className="text-center line-heig text-3xl/30">{initials}</div>
                    </div>
                    <div className="ml-22 mt-10 text-xl">{currentUser?.fullName}</div>
                </div>
                <div className="col-span-8">
                    <div className="flex gap-20 text-2xl font-semibold items-center mt-30">
                        <div className="relative after:top-8 after:left-0 after:w-30 after:absolute after:h-1 after:bg-blue-900">
                            Profile
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-col gap-20 text-xl pt-20">
                        <div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <div className="mt-5">
                                    <TextField
                                        className="p-20 w-100 bg-white"
                                        id="email"
                                        name="email"
                                        variant="outlined"
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="mt-10">
                                <label htmlFor="fullname">Full Name</label>
                                <div className="mt-5">
                                    <TextField
                                        className="p-20 w-100 bg-white"
                                        id="fullname"
                                        name="fullName"
                                        variant="outlined"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                        </div>
                        <div>
                            <div >
                                <label htmlFor="phone">Phone</label>
                                <div className="mt-5">
                                    <TextField
                                        className="p-20 w-100 bg-white"
                                        id="phone"
                                        name="phone"
                                        variant="outlined"
                                        value={form.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="mt-10 mb-10">
                                <label htmlFor="dob">Date of birth</label>
                                <div className="mt-5">
                                    <TextField
                                        className="p-20 w-100 bg-white"
                                        id="dob"
                                        name="dateOfBirth"
                                        variant="outlined"
                                        value={form.dateOfBirth}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    {!isEditing ? (
                        <Button
                            variant="contained"
                            className="!px-8 !block !mx-auto !p-4 border rounded-md !bg-rose-500 !hover:bg-rose-600"
                            onClick={() => setIsEditing(true)}
                        >
                            Update
                        </Button>
                    ) : (
                        <div className="flex justify-center gap-4 mt-8">
                            <Button
                                variant="contained"
                                className="!px-8 !p-4 border rounded-md !bg-green-500 !hover:bg-green-600"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                className="!px-8 !p-4 border rounded-md"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
