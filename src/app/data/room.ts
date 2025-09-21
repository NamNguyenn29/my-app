export const rooms = [
    {
        id: 1,
        name: "Trav Lite Twin",
        guest: 2,
        Adult: 2,
        Children: 0,
        space: 20,
        bed: "2 single beds",
        description: "Phòng đôi gọn gàng, thoáng mát, thích hợp cho 2 người.",
        price: 1700000,
        status: "active",
        roomType: "regular",
        imgUrls: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

        ],
        services: [
            "High wifi",
            "Spa ",
            "Gym",

        ]
    },
    {
        id: 2,
        name: "Trav Deluxe King",
        guest: 2,
        Adult: 2,
        Children: 0,
        space: 28,
        bed: "1 king bed",
        description: "Phòng sang trọng với giường lớn, phù hợp cho cặp đôi.",
        price: 2500000,
        status: "active",
        roomType: "regular",
        imgUrls: [
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",

        ],
        services: [
            "High wifi",
            "Spa ",
            "Swimming pool",

        ]
    },
    {
        id: 3,
        name: "Trav Family Suite",
        guest: 4,
        Adult: 2,
        Children: 2,
        space: 40,
        bed: "2 queen beds",
        description: "Phòng rộng rãi dành cho gia đình hoặc nhóm bạn.",
        price: 3500000,
        status: "active",
        roomType: "regular",
        imgUrls: [

            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
        ],
        services: [
            "High wifi",
            "Spa ",
            "Rooftop bar",

        ]
    },
    {
        id: 4,
        name: "Trav Penthouse",
        guest: 2,
        Adult: 2,
        Children: 0,
        space: 60,
        bed: "1 king bed",
        description: "Phòng cao cấp với view toàn cảnh, tiện nghi hiện đại.",
        price: 5000000,
        status: "active",
        roomType: "regular",
        imgUrls: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",

        ],

        services: [
            "High wifi",
            "Swimming pool ",
            "Rooftop bar",
            "Gym",

        ]
    },
    ...Array.from({ length: 20 }).map((_, i) => {
        const id = i + 6;
        const types = ["Deluxe", "Suite", "Standard", "Family"];
        const statuses = ["Available", "Booked", "Maintenance"];
        const beds = ["1 King Bed", "2 Single Beds", "2 Queen Beds", "3 Beds"];
        return {
            id,
            name: `${types[i % types.length]} Room #${id}`,
            guest: 2 + (i % 5),
            Adult: 1 + (i % 3),
            Children: i % 2,
            space: 25 + i * 2,
            bed: beds[i % beds.length],
            description: `Mẫu phòng số ${id} - thiết kế hiện đại, tiện nghi.`,
            price: 800000 + (i * 100000),
            imgUrls: [
                `https://picsum.photos/id/${1060 + i}/400/300`,
                `https://picsum.photos/id/${1070 + i}/400/300`,
            ],
            services: ["Wi-Fi", ...(i % 3 === 0 ? ["Breakfast"] : [])],
            roomType: types[i % types.length],
            status: statuses[i % statuses.length],
        };
    }),
];
