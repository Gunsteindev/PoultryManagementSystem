import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import ConsomationForm from '../form/ConsomationForm';
import DynamicTableComponent from './DynamicTableComponent';


export interface ConsomationProp {
    consomation_batiment: string;
    consomation_date: string;
    consomation_id: number;
    consomation_name: string;
    consomation_quantity: string;
}

interface DataRow {
    id: number;
    roomCode: string,
    feedingName: string,
    quantity: string,
    date: string,
    item: ConsomationProp;
}

interface ConsomationTableProp {
    consomationData: ConsomationProp[];
}


const ConsomationTable = ({ consomationData }: ConsomationTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ConsomationProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<ConsomationProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: ConsomationProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: ConsomationProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!consomationData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("food_tableHeader_feeding_roomCode"), accessor: 'roomCode' },
        { header: t("food_tableHeader_feeding_feedingName"), accessor: 'feedingName' },
        { header: t("food_tableHeader_feeding_quantity"), accessor: 'quantity' },
        { header: t("food_tableHeader_feeding_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    consomationData.map((item: any) =>{
        data.push({
            id: item.consomation_id,
            roomCode: item.consomation_batiment,
            feedingName: item.consomation_name,
            quantity: item.consomation_quantity,
            date: item.consomation_date,
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
                <ConsomationForm
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
                    deletedLabel={"consomation"} 
                    deletedID={deletedItem?.consomation_id}
                    deletedDataHeader={deletedItem?.consomation_name} />
                )
            }
        </div>
    );
};

export default ConsomationTable;

