import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import TreatmentForm from '../form/TreatmentForm';
import DynamicTableComponent from './DynamicTableComponent';

export interface TreatmentProp {
    treatment_batiment_code: string;
    treatment_comment: string;
    treatment_id: number;
    treatment_name: string;
    treatment_veto_name: string;
}

interface DataRow {
    id: number;
    roomCode: string,
    treatmentName: string,
    administrator: string,
    comment: string,
    date: string;
    item: TreatmentProp;
}

interface TreatmentTableProp {
    treatmentData: TreatmentProp[];
}

const TreatmentTable = ({ treatmentData }: TreatmentTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TreatmentProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<TreatmentProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: TreatmentProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: TreatmentProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!treatmentData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("treatment_tableHeader_treatment_roomCode"), accessor: 'roomCode' },
        { header: t("treatment_tableHeader_treatment_treatmentName"), accessor: 'treatmentName' },
        { header: t("treatment_tableHeader_treatment_administrator"), accessor: 'administrator' },
        { header: t("treatment_tableHeader_treatment_comment"), accessor: 'comment' },
        { header: t("treatment_tableHeader_treatment_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    treatmentData.map((item: any) =>{
        data.push({
            id: item.treatment_id,
            roomCode: item.treatment_batiment_code,
            treatmentName: item.treatment_name,
            administrator: item.treatment_veto_name,
            comment: item.treatment_comment,
            date: item.treatment_date,
            item: item
        });
    });

    const handleUpdate = (row: Record<string, any>) => {
        console.log('Update row:', row);
        data.forEach((item) => {
            if (item.id === row.id) {
                toggleShowForm(true, item.item);
            }
        }
    )};
    
    const handleDelete = (row: Record<string, any>) => {
        console.log('Delete row:', row);
        data.forEach((item) => {
            if (item.id === row.id) {
                toggleDeleteDlg(true, item.item);
            }
        }
    )};

    return (
        <div style={{ padding: '0px', overflowX: 'auto' }}>
            <DynamicTableComponent
                columns={columns}
                data={data}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
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
