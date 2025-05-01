import React, { useState } from 'react';
import { Pencil, Trash2, Printer } from 'lucide-react';

interface Column {
    header: string;
    accessor: string;
}

interface DynamicTableProps {
    columns: Column[];
    data: Record<string, any>[];
    onUpdate: (row: Record<string, any>) => void;
    onDelete: (row: Record<string, any>) => void;
}

const DynamicTableComponent: React.FC<DynamicTableProps> = ({ columns, data, onUpdate, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full  bg-white rounded-lg dark:bg-slate-800">
                <thead className="bg-gray-100 dark:bg-slate-800">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-4 py-2 text-left text-lg font-bold"
                            >
                                {column.header}
                            </th>
                        ))}
                        <th className="px-4 py-2 flex justify-center text-left text-lg font-bold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={rowIndex % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50 dark:bg-slate-800'}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                key={colIndex}
                                className="px-4 py-2 text-sm"
                                >
                                {row[column.accessor]}
                                </td>
                            ))}
                            <td className="px-4 py-2 text-sm text-gray-700 flex justify-center space-x-2">
                                <button
                                    onClick={() => onUpdate(row)}
                                    className="px-3 py-1 text-white rounded-md bg-green-500 hover:bg-green-600"
                                >
                                    <Pencil size={22} />
                                </button>
                                <button
                                    onClick={() => onDelete(row)}
                                    className="px-3 py-1 text-white rounded-md bg-red-500 hover:bg-red-600"
                                >
                                    <Trash2 size={22} />
                                </button>
                                <button
                                    onClick={() => onDelete(row)}
                                    className="px-3 py-1 text-white rounded-md bg-gray-500 hover:bg-gray-600"
                                >
                                    <Printer size={22} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4 space-x-4">
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicTableComponent;