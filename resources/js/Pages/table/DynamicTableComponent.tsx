import React, { useState, useRef } from 'react';
import { Pencil, Trash2, Printer, ArrowUp, ArrowDown, MoreHorizontalIcon } from 'lucide-react';
import { useTranslation } from "react-i18next";

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
    // const itemsPerPage = 8;
    const [itemsPerPage] = useState(8);
    const [filterText, setFilterText] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

    const { t, i18n } = useTranslation();

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const wrapperRef = useRef<HTMLDivElement>(null);

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

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    const filteredData = data.filter((row) =>
        columns.some((column) =>
            String(row[column.accessor]).toLowerCase().includes(filterText.toLowerCase())
        )
    );
    
    const sortedData = sortConfig? [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    }) : filteredData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-hidden">
            {/* Filter Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filter..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-[25%] px-4 py-2 border-none  rounded-md focus:outline-none dark:bg-slate-800"
                />
            </div>
            <table className="min-w-full h-full bg-white rounded-lg dark:bg-slate-800 mb-20">
                <thead className="bg-gray-100 dark:bg-slate-800">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                onClick={() => handleSort(column.accessor)}
                                className="px-4 py-2 text-left text-sm font-bold"
                            >
                                <span className='flex items-center cursor-pointer'>
                                {column.header}
                                {sortConfig?.key === column.accessor && (
                                    <>{sortConfig.direction === 'asc' ? <ArrowUp size={18}/> : <ArrowDown size={18} />}</>
                                )}
                                </span>
                                
                            </th>
                        ))}
                        <th className="px-4 py-2 flex justify-center text-left text-sm font-bold">
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
                            <td className="px-4 py-2 text-sm text-center relative">
                                <button onClick={() => setOpenPopoverIndex(openPopoverIndex === rowIndex ? null : rowIndex)}>
                                    <MoreHorizontalIcon size={20} />
                                </button>
                                {openPopoverIndex === rowIndex && (
                                    <div className="absolute z-10 right-0 mt-2 w-40 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md shadow-lg">
                                        <button
                                            onClick={() => {
                                                onUpdate(row);
                                                setOpenPopoverIndex(null);
                                            }}
                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-600"
                                        >
                                            <Pencil size={16} className="inline mr-2" /> {t('action_btn_update')}
                                        </button>
                                        <button
                                            onClick={() => {
                                                onDelete(row);
                                                setOpenPopoverIndex(null);
                                            }}
                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-600"
                                        >
                                            <Trash2 size={16} className="inline mr-2" /> {t('action_btn_delete')}
                                        </button>
                                        <button
                                            onClick={() => {
                                                console.log('Print', row);
                                                setOpenPopoverIndex(null);
                                            }}
                                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-600"
                                        >
                                            <Printer size={16} className="inline mr-2" /> {t('action_btn_print')}
                                        </button>
                                    </div>
                                )}
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
                        className={`px-4 py-2 text-sm font-medium bg-gray-300 dark:bg-gray-700 rounded-md ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-sm font-medium bg-gray-300 dark:bg-gray-700 rounded-md ${
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

