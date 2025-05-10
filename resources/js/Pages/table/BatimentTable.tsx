import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import BatimentForm from '../form/BatimentForm';
import DeleteDialog from '../dialog/DeleteDialog';
import DynamicTableComponent from './DynamicTableComponent';


export interface BatimentProp {
    batiment_id: number;
    batiment_code: string;
    batiment_category: string;
    batiment_capacity: string;           
    batiment_description: string;
}

interface DataRow {
    id?: number;
    roomCode: string,
    roomCategory: string,
    roomCapacity: string,
    roomDescription: string,
    item: BatimentProp;
}

interface BatimentTableProp {
    batimentData: BatimentProp[];
}

const BatimentTable = ({ batimentData }: BatimentTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BatimentProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BatimentProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: BatimentProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BatimentProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!batimentData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("room_tableHeader_roomCode"), accessor: 'roomCode' },
        { header: t("room_tableHeader_roomCategory"), accessor: 'roomCategory' },
        { header: t("room_tableHeader_roomCapacity"), accessor: 'roomCapacity' },
        { header: t("room_tableHeader_roomDescription"), accessor: 'roomDescription' },
    ];

    const data: DataRow[] = [
        // Example data rows can be added here if needed
    ];

    batimentData.map((item: BatimentProp) =>{
        data.push({
            id: item.batiment_id,
            roomCode: item.batiment_code,
            roomCategory: item.batiment_category,
            roomCapacity: item.batiment_capacity,
            roomDescription: item.batiment_description,
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

