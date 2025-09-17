import "../globals.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
    return (
        <div>
            <div className="header-top-bar bg-black px-10">
                <div className="flex items-center">
                    <a href="#" className="block w-[150px] mx-auto mt-[-20px]"><img src="/logo.png" alt="" /></a>
                    <div className="member-login font-semibold text-white text-right pr-5px cursor-pointer my-auto relative">THÀNH VIÊN</div>
                </div>
            </div>
            <div className="header-menu-group flex items-center justify-between w-full px-24 bg-white ">
                <div className="text-black  left-22">
                    <FontAwesomeIcon icon={faBars} size="lg" />
                </div>
                <nav>
                    <ul className="main-menu flex gap-10 items-center">
                        {[
                            "HOTELS",
                            "OURSERVICE",
                            "EXPERIENCE WITH STRAVSTAY",
                            "STRAVSTAY DISCOVERY",
                            "CONTACT US"
                        ].map((item) => (
                            <li key={item}>
                                <a href="#" className="
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
                                    {item}
                                </a></li>
                        ))}
                    </ul>
                </nav>
                <div className="w-40 h-20 bg-rose-500 transform -skew-x-12 flex items-center justify-center text-xl hover:bg-blue-950  " >
                    <span className="cursor-pointer skew-x-12 text-white font-semibold ">Book Now</span>
                </div>
            </div>

        </div >

    )
}