import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import SupplierForm from '../form/SupplierForm';

export interface SupplierProp {
    supplier_id?: number;
    supplier_name: string;
    supplier_company: string;
    supplier_address: string;
    supplier_position: string;
    supplier_role: string;
    supplier_telephone: string;
}

export interface SupplierResponse {
    data: SupplierProp[];
}

interface SupplierTableProp {
    supplierData: SupplierProp[];
}

const SupplierTable = ({ supplierData }: SupplierTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = supplierData ? Math.ceil(supplierData.length / itemsPerPage) : 0;
    const currentItems = supplierData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SupplierProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<SupplierProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: SupplierProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: SupplierProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!supplierData?.length) {
        return <p className="text-center py-4">No Supplier data available.</p>;
    }

    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        {/* <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md'>ID</th> */}
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md'>Nom</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Position</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Compagnie</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Role</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Address</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Telephone</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.supplier_id}>
                            {/* <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_id}</td> */}
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_name}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_position}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_company}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_role}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_address}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.supplier_telephone}</td>
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
                <SupplierForm
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
                    deletedLabel={"supplier"} 
                    deletedID={deletedItem?.supplier_id}
                    deletedDataHeader={deletedItem?.supplier_name} />
                )
            }
        </div>
    );
};

export default SupplierTable;

