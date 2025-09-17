'use client'
import { useState } from "react";
import "../globals.css";
import TextField from "@mui/material/TextField";
import { FormControl, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";

export default function RootLayout() {
    const [form, setForm] = useState({
        email: "",
        address: "",
        fullName: "",
        dateOfBirth: "",
        phone: "",
        gender: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }
    return (
        <div>
            <div className="text-center font-semibold text-3xl my-10">My Profile</div>
            <div className="w-380 h-2 bg-rose-500 mx-auto "></div>
            <div className="bg-[rgb(215,215,215)] grid grid-flow-col grid-cols-12 container mx-auto p-10 my-20">
                <div className="col-span-4" >
                    <div className="text-2xl m-10 font-bold">Account Information</div>
                    <div className="rounded rounded-full w-30 bg-white h-30 ml-20" >
                        <div className="text-center line-heig text-3xl/30">NA</div>
                    </div>
                    <div className="ml-22 mt-10 text-xl">Nam Nguyen</div>
                </div>
                <div className="col-span-8" >
                    <div className="flex gap-20 text-2xl font-semibold items-center mt-30">
                        <div className="relative after:top-8 after:left-0 after:w-30 after:absolute after:h-1 after:bg-blue-900  ">Profile</div>
                        <div>Password</div>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-col gap-20 text-xl pt-20">
                        <div >
                            <div>
                                <label htmlFor="email">Email</label>
                                <div className="mt-5">
                                    <TextField className="p-20 w-100 bg-white" id="email" name="email" label="Email" variant="outlined" value={form.email} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mt-10">
                                <label htmlFor="fullname">Full Name</label>
                                <div className="mt-5">
                                    <TextField className="p-20 w-100 bg-white" id="fullname" name="fullName" label="Full Name" variant="outlined" value={form.fullName} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mt-10 mb-10">
                                <label htmlFor="dob">Date of birth</label>
                                <div className="mt-5">
                                    <TextField className="p-20 w-100 bg-white" id="dob" name="dateOfBirth" label="Date of birth" variant="outlined" value={form.dateOfBirth} onChange={handleChange} />
                                </div>
                            </div>

                        </div>
                        <div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <div className="mt-5">
                                    <TextField className="p-20 w-100 bg-white" id="address" name="address" label="Adress" variant="outlined" value={form.address} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mt-10">
                                <label htmlFor="phone">Email</label>
                                <div className="mt-5">
                                    <TextField className="p-20 w-100 bg-white" id="phone" label="Phone" name="phone" variant="outlined" value={form.phone} onChange={handleChange} />
                                </div>

                            </div>
                            <div className="mt-10">
                                <label htmlFor="gender">Gender</label>
                                <div className="mt-5">
                                    <Select
                                        className="bg-white"

                                        id="gender"
                                        name="gender"
                                        value={form.gender}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </div>

                            </div>

                        </div>
                    </div>
                    <Button variant="contained" className="!px-8 !block !mx-auto !p-4 border rounded-md !bg-rose-500 !hover:bg-rose-600 ">Update</Button>

                </div>

            </div >
        </div>
    );
}
