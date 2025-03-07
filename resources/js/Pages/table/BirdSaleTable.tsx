import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2, Printer } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import BirdSaleForm from '../form/BirdSaleForm';
import { usePage } from '@inertiajs/react';


export interface BirdSaleProp {
    bird_sale_batiment_code: string;
    bird_sale_code: string;
    bird_sale_date: string; 
    bird_sale_description: string;
    bird_sale_id: number;
    bird_sale_quantity: string;  
    bird_sale_reduction: string;  
    bird_sale_total_cost: string;  
    bird_sale_unit_price: string;  
}

export interface BirdSaleResponse {
    data: BirdSaleProp[];
}


interface BirdSaleTableProp {
    birdSaleData: BirdSaleProp[];

}


const BirdSaleTable = ({ birdSaleData }: BirdSaleTableProp) => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = birdSaleData ? Math.ceil(birdSaleData.length / itemsPerPage) : 0;
    const currentItems = birdSaleData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BirdSaleProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BirdSaleProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BirdSaleProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BirdSaleProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!birdSaleData?.length) {
        return <p className="text-center py-4">No Vente volaille data available.</p>;
    }


    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Sale Code</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Batiment Code</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Description</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Prix unitaire</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Reduction</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Prix Total</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Date</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.bird_sale_id}>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_batiment_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_description}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_unit_price}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_reduction}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_total_cost}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.bird_sale_date}</td>
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
                                    <Button
                                        className='bg-gray-500 shadow-none'
                                        // onClick={() => toggleDeleteDlg(true, item)}
                                    >
                                        <Printer size={20} />
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
                <BirdSaleForm
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
                    deletedLabel={"birdsale"} 
                    deletedID={deletedItem?.bird_sale_id}
                    deletedDataHeader={deletedItem?.bird_sale_code} />
                )
            }
        </div>
    );
};

export default BirdSaleTable;

