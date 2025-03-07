import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import ProductForm from '../form/ProductForm';


export interface PickupProp {
    pickup_id: number;
    pickup_code: string;
    pickup_batiment: string;
    pickup_date: string | Date;                
    pickup_crate_quantity: string | number;      
    pickup_quantity_loss: string | number;       
    pickup_quantity_remain: string | number;     
    pickup_total_quantity: string | number;      
}

export interface PickupResponse {
    data: PickupProp[];
}


interface PickupTableProp {
    pickupData: PickupProp[];

}


const PickupTable = ({ pickupData }: PickupTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = pickupData ? Math.ceil(pickupData.length / itemsPerPage) : 0;
    const currentItems = pickupData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PickupProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<PickupProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: PickupProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: PickupProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!pickupData?.length) {
        return <p className="text-center py-4">No Ramassage data available.</p>;
    }

    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                    <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Code Ramassage</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md'>Code Batiment</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite Plateau</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Perte</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Oeuf Restant</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite Total</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Date</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.pickup_id}>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_batiment}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_crate_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_quantity_loss}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_quantity_remain}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_total_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.pickup_date}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>
                                <div className='flex justify-start space-x-4'>
                                    <Button
                                        className='bg-orange-500 shadow-none'
                                        onClick={() => toggleShowForm(true, item)}
                                    >
                                        <PencilOff size={20} />
                                    </Button>
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
            {editForm && (
                <ProductForm
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
                    deletedLabel={"pickup"} 
                    deletedID={deletedItem?.pickup_id}
                    deletedDataHeader={deletedItem?.pickup_code} />
                )
            }
        </div>
    );
};

export default PickupTable;

