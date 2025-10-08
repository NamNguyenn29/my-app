import { User } from "@/types/User";
import { Booking } from "@/types/Booking";
import { Room } from "@/types/Room";

const BASE_URL = "http://localhost:5199/api";

// 🟢 Tất cả request cần cookie JWT -> thêm credentials: 'include'

export async function getBookings(): Promise<Booking[]> {
    try {
        const res = await fetch(`${BASE_URL}/Booking`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");
        return await res.json();
    } catch (err) {
        console.error("Error fetching bookings:", err);
        return [];
    }
}

export async function getUsers(): Promise<User[]> {
    try {
        const res = await fetch(`${BASE_URL}/User`, {
            method: "GET",
            credentials: "include", // 👈 gửi cookie
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch users");
        return await res.json();
    } catch (err) {
        console.error("Error fetching users:", err);
        return [];
    }
}

export async function getRooms(): Promise<Room[]> {
    try {
        const res = await fetch(`${BASE_URL}/Room`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return await res.json();
    } catch (err) {
        console.error("Error fetching rooms:", err);
        return [];
    }
}

export async function getUserById(): Promise<User | null> {
    try {
        const res = await fetch(`${BASE_URL}/User/me`, {
            method: "GET",
            credentials: "include", // 👈 cookie auth
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        return await res.json();
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
}

export async function getUserByIdForUser(): Promise<User | null> {
    try {
        const res = await fetch(`${BASE_URL}/User/me`, {
            method: "GET",
            credentials: "include", // 👈 gửi cookie JWT
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        return await res.json();
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
}

export async function getRoomById(roomId: string): Promise<Room | null> {
    try {
        const res = await fetch(`${BASE_URL}/Room/${roomId}`, {
            method: "GET",
            credentials: "include", // 👈 cookie JWT
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("Failed to fetch room");
        return await res.json();
    } catch (err) {
        console.error("Error fetching room:", err);
        return null;
    }
}

export async function getBookingById(userId: string): Promise<Booking[]> {
    try {
        const res = await fetch(`${BASE_URL}/Booking/${userId}`, {
            method: "GET",
            credentials: "include", // 👈 cookie JWT
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Failed to fetch booking");
        return await res.json();
    } catch (err) {
        console.error("Error fetching booking:", err);
        return [];
    }
}

export async function filterRoom(roomType: string, children: number, adult: number, checkInDate: Date, checkOutDate: Date) {
    try {
        const res = await fetch(`${BASE_URL}/Room/filter`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ roomType, children, adult, checkInDate, checkOutDate }),

            }
        );
        if (!res.ok) {
            throw new Error("Failed to fetch filter rooms");
        }
        const data = await res.json();
        console.log(data);
        return data;


    } catch (err) {
        console.log("Error fetching filter rooo", err);
        return [];
    }

}
