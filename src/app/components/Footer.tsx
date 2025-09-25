'use client';
import "../globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function Footer() {
    const router = useRouter();

    const handleClickLogo = () => {
        router.push("/");
    };

    const quickMenu = [
        { name: "Home", href: "/" },
        { name: "Service", href: "/ourservice" },
        { name: "Our Room", href: "#" },
    ];

    const supportLinks = [
        { name: "FAQ", href: "/faq" },
        { name: "Privacy & Cookies", href: "/privacy" },
        { name: "Sitemap", href: "/sitemap" },
    ];

    const contactInfo = [
        { name: "A : 123 My Phuoc Tan Van, Chanh Hiep, Ho Chi Minh", href: "#" },
        { name: "P : +(84)123456789", href: "#" },
        { name: "E : stravstay@gmail.com", href: "mailto:stravstay@gmail.com" },
    ];

    const socialLinks = [
        { name: "Facebook", href: "https://facebook.com" },
        { name: "Instagram", href: "https://instagram.com" },
        { name: "Youtube", href: "https://youtube.com" },
    ];

    return (
        <div className="bg-gray-900 text-white">
            <div className="container px-10 py-20">
                <div className="grid grid-cols-6 gap-10">
                    {/* Logo + Email Subscribe */}
                    <div className="col-span-2">
                        <div onClick={handleClickLogo} className="w-48 cursor-pointer mb-5">
                            <img src="logo.png" alt="Logo" />
                        </div>
                        <div className="flex gap-4">
                            <TextField
                                label="Your Email Address"
                                variant="outlined"
                                sx={{
                                    width: '220px',
                                    '& .MuiInputBase-input': {
                                        textAlign: 'center', // input chữ giữa
                                        padding: '12px',
                                        color: 'white',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '9999px',
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                        width: '100%',
                                        textAlign: 'center', // label chữ giữa
                                        left: 0,
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'white',
                                    },
                                }}
                            />



                            <Button
                                type="submit"
                                sx={{
                                    width: 140,              // thay cho w-35
                                    borderRadius: '9999px',  // rounded-full
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid black',
                                    backgroundColor: '#e9bc6eff', // bƯg-orange-200
                                    color: 'black',
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: '#685036ff', // hover màu cam đậm
                                    },
                                }}
                            >
                                Subscribe
                            </Button>

                        </div>
                    </div>

                    {/* Quick Menu */}
                    <div className="col-span-1">
                        <div className="title text-3xl pt-20 mb-7">Quick Menu</div>
                        <ul className="text-lg">
                            {quickMenu.map((item) => (
                                <li key={item.name} className="mb-3">
                                    <Link
                                        href={item.href}
                                        className="relative py-2 text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[3px] after:bg-white after:transition-all after:duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1">
                        <div className="title text-3xl pt-20 mb-7">Support</div>
                        <ul className="text-lg">
                            {supportLinks.map((item) => (
                                <li key={item.name} className="mb-3">
                                    <Link
                                        href={item.href}
                                        className="relative py-2 text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[3px] after:bg-white after:transition-all after:duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1">
                        <div className="title text-3xl pt-20 mb-7">Contact Info</div>
                        <ul className="text-lg">
                            {contactInfo.map((item) => (
                                <li key={item.name} className="mb-3">
                                    <Link
                                        href={item.href}
                                        className="text-lg py-2 text-white"
                                        target={item.href.startsWith("http") ? "_blank" : "_self"}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Site */}
                    <div className="col-span-1">
                        <div className="title text-3xl pt-20 mb-7">Social Site</div>
                        <ul className="text-lg">
                            {socialLinks.map((item) => (
                                <li key={item.name} className="mb-3">
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative py-2 text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:h-[3px] after:bg-white after:transition-all after:duration-300"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="horizontal my-10 bg-white border-t-1 border-white"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div>Copyright © 2024 All rights reserved</div>
                    <div className="text-end">Villa & Resort</div>
                </div>
            </div>
        </div>
    );
}
