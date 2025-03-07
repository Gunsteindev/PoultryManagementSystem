import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import BandPurchaseForm from '../form/BandPurchaseForm';
import { usePage } from '@inertiajs/react';


export interface BandPurchaseProp {
    band_id: number;
    band_purchase_band_code: string;
    band_purchase_code: string;
    band_purchase_date: string;             
    band_purchase_description: string;
    band_purchase_quantity: string;    
    band_purchase_reduction: string;   
    band_purchase_total_cost: string;  
    band_purchase_unit_price: string;  
}

export interface BandPurchaseResponse {
    data: BandPurchaseProp[];
}


interface BandPurchaseTableProp {
    bandPurchaseData: BandPurchaseProp[];
}


const BandPurchaseTable = ({ bandPurchaseData }: BandPurchaseTableProp) => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = bandPurchaseData ? Math.ceil(bandPurchaseData.length / itemsPerPage) : 0;
    const currentItems = bandPurchaseData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BandPurchaseProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BandPurchaseProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BandPurchaseProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BandPurchaseProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!bandPurchaseData?.length) {
        return <p className="text-center py-4">No Achat volaille data available.</p>;
    }

    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md'>Purchase Code</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Band Code</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Description</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Prix Unitaire</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Reduction</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Prix Total</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Date</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: BandPurchaseProp) => (
                        <tr key={item.band_id}>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_band_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_description}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_unit_price}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_reduction}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_total_cost}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.band_purchase_date}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>
                                <div className='flex justify-start space-x-4'>
                                    <Button
                                        className='bg-orange-500 shadow-none'
                                        onClick={() => toggleShowForm(true, item)}
                                    >
                                        <PencilOff size={20} />
                                    </Button>
                                    {(roles === 'Admin' || roles === 'Supervisor') && (
                                        <>
                                            <Button
                                                className='bg-red-500 shadow-none'
                                                onClick={() => toggleDeleteDlg(true, item)}
                                            >
                                                <Trash2 size={20} />
                                            </Button>
                                        </>
                                    )}
                                    
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
            {editForm && (
                <BandPurchaseForm
                    title={title.current}
                    showDlg={editForm}
                    toggleDlg={setEditForm}
                    selectedData={selectedItem} // Pass the selected item data
                />
            )}
            {deleteDlg && (
                <DeleteDialog 
                    deleteDlg={deleteDlg} 
                    toggleDeleteDlg={toggleDeleteDlg}
                    deletedLabel={"bandpurchase"} 
                    deletedID={deletedItem?.band_id}
                    deletedDataHeader={deletedItem?.band_purchase_code} />
                )
            }
        </div>
    );
};

export default BandPurchaseTable;

