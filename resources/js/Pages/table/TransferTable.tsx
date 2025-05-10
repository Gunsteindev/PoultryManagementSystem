import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import DynamicTableComponent from './DynamicTableComponent';

export interface TransferProp {
    transfer_band_code: string;
    transfer_batiment_code: string;
    transfer_id: number;
    transfer_quantity: string;  
}

interface DataRow {
    id?: number;
    roomCode: string,
    bandCode: string,
    transferQuantity: string,
    item: TransferProp;
}

interface TransferTableProp {
    transferData: TransferProp[];
}


const TransferTable = ({ transferData }: TransferTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TransferProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<TransferProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: TransferProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: TransferProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!transferData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("transfer_tableHeader_roomCode"), accessor: 'roomCode' },
        { header: t("transfer_tableHeader_bandCode"), accessor: 'bandCode' },
        { header: t("transfer_tableHeader_transferQuantity"), accessor: 'transferQuantity' },
    ];

    const data: DataRow[] = [
        // Example data rows can be added here if needed
    ];

    transferData.map((item: TransferProp) =>{
        data.push({
            id: item.transfer_id,
            roomCode: item.transfer_batiment_code,
            bandCode: item.transfer_band_code,
            transferQuantity: item.transfer_quantity,
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
            {deleteDlg && (
                <DeleteDialog 
                    deleteDlg={deleteDlg} 
                    toggleDeleteDlg={toggleDeleteDlg}
                    deletedLabel={"transfer"} 
                    deletedID={deletedItem?.transfer_id}
                    deletedDataHeader={deletedItem?.transfer_batiment_code} />
                )
            }
        </div>
    );
};

export default TransferTable;

