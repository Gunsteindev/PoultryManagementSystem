import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import TreatmentForm from '../form/TreatmentForm';

export interface TreatmentProp {
    treatment_batiment_code: string;
    treatment_comment: string;
    treatment_id: number;
    treatment_name: string;
    treatment_veto_name: string;
}

export interface TreatmentResponse {
    data: TreatmentProp[];
}

interface TreatmentTableProp {
    treatmentData: TreatmentProp[];
}

const TreatmentTable = ({ treatmentData }: TreatmentTableProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = treatmentData ? Math.ceil(treatmentData.length / itemsPerPage) : 0;
    const currentItems = treatmentData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) || [];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TreatmentProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<TreatmentProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: TreatmentProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: TreatmentProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!treatmentData?.length) {
        return <p className="text-center py-4">No treatment data available.</p>;
    }

    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className="bg-white dark:bg-slate-800">
                <thead>
                    <tr>
                        <th className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-md">Code Batiment</th>
                        <th className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3">Name</th>
                        <th className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3">Veterinaire</th>
                        <th className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3">Comment</th>
                        <th className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.treatment_id}>
                            <td className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm">
                                {item.treatment_batiment_code}
                            </td>
                            <td className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm">
                                {item.treatment_name}
                            </td>
                            <td className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm">
                                {item.treatment_veto_name}
                            </td>
                            <td className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm">
                                {item.treatment_comment}
                            </td>
                            <td className="text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm">
                                <div className="flex justify-start space-x-4">
                                    <Button
                                        className="bg-orange-500 shadow-none"
                                        onClick={() => toggleShowForm(true, item)}
                                    >
                                        <PencilOff size={20} />
                                    </Button>
                                    <Button
                                        className="bg-red-500 shadow-none"
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
                <TreatmentForm
                    title={title.current}
                    showDlg={editForm}
                    toggleDlg={setEditForm}
                    selectedData={selectedItem}
                />
            )}
            {deleteDlg && (
                <DeleteDialog
                    deleteDlg={deleteDlg}
                    toggleDeleteDlg={toggleDeleteDlg}
                    deletedLabel="treatment"
                    deletedID={deletedItem?.treatment_id}
                    deletedDataHeader={deletedItem?.treatment_name}
                />
            )}
        </div>
    );
};

export default TreatmentTable;
