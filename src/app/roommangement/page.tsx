
import "../globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

export default function RoomMangement() {
    return (
        <>
            <div className="text-center text-5xl text-white bg-black font-semibold  p-10">Booking Room</div>
            <div className="bg-[rgb(250,247,245)] mx-auto container py-5 ">
                <div className=" grid grid-cols-12 ">

                    <div className="col-start-9 col-span-4 text-center p-20 grid grid-cols-12">
                        <div className="col-span-4 bg-[rgb(217,217,217)]  text-center  text-lg/20 w-20 h-20 rounded-full">NN</div>
                        <div className="col-span-4 text-left text-xl font-semibold  pt-2">
                            <div>Profile</div>
                            <FontAwesomeIcon icon={faUser} size="xl" />
                        </div>
                        <div className="col-span-4 -ml-30 mt-5"><FontAwesomeIcon icon={faBars} size="2xl" className="item-self-center" /></div>
                    </div>
                </div>
            </div>
            <div className="my-20 h-2 container mx-auto bg-black "></div>
        </>
    )
}