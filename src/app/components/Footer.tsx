import "../globals.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <div className="bg-gray-900 text-white">
            <div className="container px-10 py-20">
                <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-2">
                        <div className="w-48">
                            <img src="logo.png" alt="" />
                        </div>
                        <div className="flex gap-10">
                            <div className="w-55 email-field border text-center rounded-full p-3 cursor-pointer">Your Email Adress</div>
                            <div className="w-35 sub-button rounded-full text-center cursor-pointer border p-3 bg-orange-200 text-black font-medium">Subcribe</div>
                        </div>

                    </div>
                    <div className="col-span-1 ">
                        <div className="title text-3xl pt-20 mb-7">Quick Menu</div>
                        <ul className='text-lg 
                            
                        '>
                            {[
                                "Home",
                                "About",
                                "Our Room",
                            ].map((item) => (
                                <li key={item} className="mb-3">
                                    <a href="#" className="
                                    text-lg
                                    relative
                                    after:content-['']
                                    after:absolute
                                    after:left-0
                                    after:bottom-0
                                    after:w-0
                                    hover:after:w-full
                                    after:h-[3px]
                                    after:bg-white
                                    after:transition-all
                                    after:duration-300
                                    py-2
                                    text-white 
                                    ">
                                        {item}
                                    </a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-1 ">
                        <div className="title text-3xl pt-20 mb-7">Quick Menu</div>
                        <ul className='text-lg 
                            
                        '>
                            {[
                                "FAQ",
                                "Privacy & Cookies",
                                "Sitemap",
                            ].map((item) => (
                                <li key={item} className="mb-3">
                                    <a href="#" className="
                                    text-lg
                                    relative
                                    after:content-['']
                                    after:absolute
                                    after:left-0
                                    after:bottom-0
                                    after:w-0
                                    hover:after:w-full
                                    after:h-[3px]
                                    after:bg-white
                                    after:transition-all
                                    after:duration-300
                                    py-2
                                    text-white 
                                    ">
                                        {item}
                                    </a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-1 ">
                        <div className="title text-3xl pt-20 mb-7">Contact Info</div>
                        <ul className='text-lg 
                            
                        '>
                            {[
                                "A : 123 My Phuoc Tan Van, Chanh Hiep, Ho Chi Minh",
                                "P : +(84)123456789 ",
                                "E : stravstay@gmail.com",
                            ].map((item) => (
                                <li key={item} className="mb-3">
                                    <a href="#" className="
                                    text-lg
                                    py-2
                                    text-white 
                                    ">
                                        {item}
                                    </a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-span-1 ">
                        <div className="title text-3xl pt-20 mb-7">Social Site</div>
                        <ul className='text-lg 
                            
                        '>
                            {[
                                "FaceBook",
                                "Instagram",
                                "Youtube",
                            ].map((item) => (
                                <li key={item} className="mb-3">
                                    <a href="#" className="
                                    text-lg
                                    relative
                                    after:content-['']
                                    after:absolute
                                    after:left-0
                                    after:bottom-0
                                    after:w-0
                                    hover:after:w-full
                                    after:h-[3px]
                                    after:bg-white
                                    after:transition-all
                                    after:duration-300
                                    py-2
                                    text-white 
                                    ">
                                        {item}
                                    </a></li>
                            ))}
                        </ul>
                    </div>


                </div>
                <div className="horizontal my-10 bg-white border-t-1 border-white"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div>Copyright © 2024 All rights reserved</div>
                    <div className='text-end'>
                        Villa & Resort
                    </div>
                </div>
            </div>
        </div>
    )

}