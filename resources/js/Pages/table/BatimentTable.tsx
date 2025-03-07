import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import BatimentForm from '../form/BatimentForm';
import DeleteDialog from '../dialog/DeleteDialog';


export interface BatimentProp {
    batiment_id: number;
    batiment_code: string;
    batiment_category: string;
    batiment_capacity: string;           
    batiment_description: string;
}

export interface BatimentResponse {
    data: BatimentProp[];
}

interface BatimentTableProp {
    batimentData: BatimentProp[];
}

const BatimentTable = ({ batimentData }: BatimentTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = batimentData ? Math.ceil(batimentData.length / itemsPerPage) : 0;
    const currentItems = batimentData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BatimentProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BatimentProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BatimentProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BatimentProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!batimentData?.length) {
        return <p className="text-center py-4">No Batiment data available.</p>;
    }

    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md'>Code Batiment</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Categorie</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Capacite</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Description</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.batiment_id}>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.batiment_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.batiment_category}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.batiment_capacity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.batiment_description}</td>
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
                <BatimentForm
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
                    deletedLabel={"batiment"} 
                    deletedID={deletedItem?.batiment_id}
                    deletedDataHeader={deletedItem?.batiment_code} />
                )
            }
        </div>
    );
};

export default BatimentTable;

