import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import FoodForm from '../form/FoodForm';

export interface FoodProp {
    food_code: string;
    food_discount: string;          
    food_id?: number;
    food_name: string;
    food_price_per_bag: string;     
    food_purchase_date: string;   
    food_quantity: string;          
    food_supplier_name: string;
    food_total_cost: string;        
}

export interface FoodResponse {
    data: FoodProp[];
}

interface FoodTableProp {
    foodData: FoodProp[];
}


const FoodTable = ({ foodData }: FoodTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = foodData ? Math.ceil(foodData.length / itemsPerPage) : 0;
    const currentItems = foodData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FoodProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<FoodProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: FoodProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: FoodProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!foodData?.length) {
        return <p className="text-center py-4">No Aliment data available.</p>;
    }


    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        {/* <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>ID</th> */}
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Code</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Nom</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Fournisseur</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Prix / Sac</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Quantite</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Reduction</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Prix Total</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Date</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: FoodProp) => (
                        <tr key={item.food_id}>
                            {/* <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_id}</td> */}
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_name}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_supplier_name}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_price_per_bag}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_discount}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_total_cost}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.food_purchase_date}</td>
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
                <FoodForm
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
                    deletedLabel={"foodPurchase"} 
                    deletedID={deletedItem?.food_id}
                    deletedDataHeader={deletedItem?.food_name} />
                )
            }
        </div>
    );
};

export default FoodTable;

