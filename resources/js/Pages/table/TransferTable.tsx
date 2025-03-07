import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import TreatmentForm from '../form/TreatmentForm';

export interface TransferProp {
    transfer_band_code: string;
    transfer_batiment_code: string;
    transfer_id: number;
    transfer_quantity: string;  
}

export interface TransferResponse {
    data: TransferProp[];
}

interface TransferTableProp {
    transferData: TransferProp[];
}


const TransferTable = ({ transferData }: TransferTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = transferData ? Math.ceil(transferData.length / itemsPerPage) : 0;
    const currentItems = transferData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TransferProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<TransferProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: TransferProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: TransferProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!transferData?.length) {
        return <p className="text-center py-4">No Transfer data available.</p>;
    }


    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        {/* <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md'>ID</th> */}
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Batiment</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Band</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.transfer_id}>
                            {/* <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.transfer_id}</td> */}
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.transfer_batiment_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.transfer_band_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.transfer_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>
                                <div className='flex justify-start space-x-4'>
                                    {/* <Button
                                        className='bg-orange-500 shadow-none'
                                        onClick={() => toggleShowForm(true, item)}
                                    >
                                        <PencilOff size={20} />
                                    </Button> */}
                                    <Button
                                        className='bg-red-500 shadow-none'
                                        onClick={() => toggleDeleteDlg(true, item)}
                                    >
                                        <Trash2 size={20} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <button
                        key={pageNumber}
                        style={{
                            padding: '10px',
                            margin: '5px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: currentPage === pageNumber + 1 ? '#007bff' : '#fff',
                            color: currentPage === pageNumber + 1 ? '#fff' : '#007bff',
                            cursor: 'pointer',
                        }}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
            {deleteDlg && (
                <DeleteDialog 
                    deleteDlg={deleteDlg} 
                    toggleDeleteDlg={toggleDeleteDlg}
                    deletedLabel={"transfer"} 
                    deletedID={deletedItem?.transfer_id}
                    deletedDataHeader={deletedItem?.transfer_batiment_code} />
                )
            }
        </div>
    );
};

export default TransferTable;

