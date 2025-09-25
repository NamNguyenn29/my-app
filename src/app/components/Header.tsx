'use client'
import "../globals.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/authContext"; // import auth


export default function Header() {

    const menu = [
        { name: "HOTELS", href: "/" },
        { name: "OURSERVICE", href: "/ourservice" },
        { name: "EXPERIENCE WITH STRAVSTAY", href: "#" },
        { name: "STRAVSTAY DISCOVERY", href: "#" },
        { name: "CONTACT US", href: "/supportrequest" },
    ]

    const { user } = useAuth();
    const router = useRouter();

    const handleClickMemberLogin = () => {
        if (!user) {
            // chưa login thì đi sang login
            router.push("/login");
        } else {
            // đã login → check role
            if (user.role === "admin") {
                router.push("/bookingmangement");
            } else if (user.role === "user") {
                router.push("/userbooking");
            } else {
                router.push("/");
            }
        }
    };


    const handleClickLogo = () => {
        router.push("/")
    };

    const handelClickBookNow = () => {
        router.push("/booking")
    }

    return (
        <div>
            <div className="header-top-bar bg-black px-10">
                <div className="flex items-center">
                    <a onClick={() => handleClickLogo()} className="cursor-pointer block w-[150px] mx-auto mt-[-20px]"><img src="/logo.png" alt="" /></a>
                    <div className="member-login font-semibold text-white text-right pr-5px cursor-pointer my-auto relative  after:content-['']
                                    after:absolute
                                    after:left-0
                                    after:bottom-0
                                    after:w-0
                                    hover:after:w-full
                                    after:h-[3px]
                                    after:bg-white
                                    after:transition-all
                                    after:duration-300" onClick={() => handleClickMemberLogin()}>MEMBER LOGIN</div>
                </div>
            </div>
            <div className="header-menu-group flex items-center justify-between w-full px-24 bg-white ">
                <div className="text-black left-22"></div>

                <nav>
                    <ul className="main-menu flex gap-10 items-center">
                        {menu.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href} className="
                                    font-semibold
                                    text-lg
                                    text-black
                                    relative
                                    after:content-['']
                                    after:absolute
                                    after:left-0
                                    after:bottom-0
                                    after:w-0
                                    hover:after:w-full
                                    after:h-[3px]
                                    after:bg-rose-500
                                    after:transition-all
                                    after:duration-300
                                    py-2
                                    ">
                                    {item.name}
                                </Link></li>
                        ))}
                    </ul>
                </nav>
                <div className="w-40 h-20 bg-rose-500 transform -skew-x-12 flex items-center justify-center text-xl hover:bg-blue-950  " >
                    <span className="cursor-pointer skew-x-12 text-white font-semibold " onClick={() => handelClickBookNow()}>Book Now</span>
                </div>
            </div>

        </div >

    )
}