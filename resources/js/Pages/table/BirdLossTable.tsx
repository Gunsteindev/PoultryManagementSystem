import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2, Printer } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import BirdSaleForm from '../form/BirdSaleForm';
import { usePage } from '@inertiajs/react';
import BirdLossForm from '../form/BirdLossForm';


export interface BirdLossProp {
    bird_loss_id: number;
    bird_loss_batiment: string;
    bird_loss_category: string;
    bird_loss_quantity: string;
    bird_loss_date: string;  
}

export interface BirdLossResponse {
    data: BirdLossProp[];
}


interface BirdLossTableProp {
    birdLossData: BirdLossProp[];

}


const BirdLossTable = ({ birdLossData }: BirdLossTableProp) => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = birdLossData ? Math.ceil(birdLossData.length / itemsPerPage) : 0;
    const currentItems = birdLossData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BirdLossProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BirdLossProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BirdLossProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BirdLossProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!birdLossData?.length) {
        return <p className="text-center py-4">No Vente volaille data available.</p>;
    }


    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Batiment</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Description</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Date</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.bird_loss_id}>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_loss_batiment}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_loss_category}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_loss_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_loss_date}</td>
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
                <BirdLossForm
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
                    deletedLabel={"birdloss"} 
                    deletedID={deletedItem?.bird_loss_id}
                    deletedDataHeader={deletedItem?.bird_loss_batiment} />
                )
            }
        </div>
    );
};

export default BirdLossTable;

