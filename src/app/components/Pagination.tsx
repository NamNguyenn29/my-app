"use client";

import React from "react";

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (perPage: number) => void;
};

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // nếu ít trang thì hiện hết
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // luôn hiện trang đầu
            pages.push(1);

            // nếu currentPage > 4 thì thêm ...
            if (currentPage > 4) {
                pages.push("...");
            }

            // hiện các trang quanh currentPage
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }

            // nếu currentPage < totalPages - 3 thì thêm ...
            if (currentPage < totalPages - 3) {
                pages.push("...");
            }

            // luôn hiện trang cuối
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-end gap-10 items-center container ml-auto my-10 border w-[600px] p-5 mr-20">
            {/* chọn số items / page */}
            <select
                value={itemsPerPage}
                onChange={(e) => {
                    onItemsPerPageChange(Number(e.target.value));
                    onPageChange(1); // reset về trang 1 khi đổi số item
                }}
                className="border rounded px-3 py-1"
            >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
            </select>

            {/* range info */}
            <span>
                {indexOfFirst + 1}-{Math.min(indexOfLast, totalItems)} / {totalItems}
            </span>

            {/* nút chuyển trang */}
            <div className="flex gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    {"<"}
                </button>

                {getPageNumbers().map((p, idx) =>
                    p === "..." ? (
                        <span key={idx} className="px-3 py-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p as number)}
                            className={`px-3 py-1 border rounded ${currentPage === p ? "bg-sky-500 text-white" : ""
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}
