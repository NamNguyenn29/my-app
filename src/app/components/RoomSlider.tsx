"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type RoomSliderProps = {
    images: string[];
    alt: string;
};

export default function RoomSlider({ images, alt }: RoomSliderProps) {
    return (
        <div className="w-full max-w-[250px] h-[200px] mx-auto overflow-hidden rounded-md">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                className="h-full"
            >
                {images.map((url, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            src={url}
                            alt={`${alt}-${idx}`}
                            className="w-full h-[200px] object-cover rounded-md"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
