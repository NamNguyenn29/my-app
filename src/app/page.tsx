
import "./globals.css";
import BookingBox from "./components/BookingBox";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="font-sans bg-gray-100 text-gray-900">
        <BookingBox />
      </body>
    </html>
  );
} 