import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import CustomerForm from '../form/CustomerForm';


export interface ClientProp {
    client_id?: number;          
    client_name: string;
    client_company: string;
    client_telephone: string;
    client_email: string;
    client_position: string;
    client_location: string;
}

export interface ClientResponse {
    data: ClientProp[];
}

interface CustomerTableProp {
    customerData: ClientProp[]
}


const CustomerTable = ({ customerData }: CustomerTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = customerData ? Math.ceil(customerData.length / itemsPerPage) : 0;
    const currentItems = customerData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ClientProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<ClientProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: ClientProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: ClientProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!customerData?.length) {
        return <p className="text-center py-4">No Client data available.</p>;
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
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Email</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Address</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Telephone</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.client_id}>
                            {/* <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_id}</td> */}
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_name}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_position}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_company}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_email}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_location}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.client_telephone}</td>
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
                <CustomerForm
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
                    deletedLabel={"client"} 
                    deletedID={deletedItem?.client_id}
                    deletedDataHeader={deletedItem?.client_name} />
                )
            }
        </div>
    );
};

export default CustomerTable;

