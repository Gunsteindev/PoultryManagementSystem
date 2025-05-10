import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { usePage } from '@inertiajs/react';
import DeleteDialog from '../dialog/DeleteDialog';
import BirdLossForm from '../form/BirdLossForm';
import DynamicTableComponent from './DynamicTableComponent';

export interface BirdLossProp {
    bird_loss_id: number;
    bird_loss_batiment: string;
    bird_loss_category: string;
    bird_loss_quantity: string;
    bird_loss_date: string;  
}

interface DataRow {
    id: number,
    roomCode: string,
    description: string,
    quantity: string,
    date: string,
    item: BirdLossProp
}

interface BirdLossTableProp {
    birdLossData: BirdLossProp[];
}


const BirdLossTable = ({ birdLossData }: BirdLossTableProp) => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];

    const { t, i18n } = useTranslation();

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BirdLossProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BirdLossProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BirdLossProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BirdLossProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!birdLossData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("bird_tableHeader_birdLoss_roomCode"), accessor: 'roomCode' },
        { header: t("bird_tableHeader_birdLoss_description"), accessor: 'description' },
        { header: t("bird_tableHeader_birdLoss_quantity"), accessor: 'quantity' },
        { header: t("bird_tableHeader_birdLoss_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    birdLossData.map((item: any) => {
        data.push({
            id: item.pickup_id,
            roomCode: item.bird_loss_batiment,
            description: item.bird_loss_category,
            quantity: item.bird_loss_quantity,
            date: item.bird_loss_date,
            item: item
        });
    });

    const handleUpdate = (row: Record<string, any>) => {
        // console.log('Update row:', row);
        data.forEach((item) => {
            if (item.id === row.id) {
                toggleShowForm(true, item.item);
            }
        }
    )};
    
    const handleDelete = (row: Record<string, any>) => {
        // console.log('Delete row:', row);
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
                <BirdLossForm
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
                    deletedLabel={"birdloss"} 
                    deletedID={deletedItem?.bird_loss_id}
                    deletedDataHeader={deletedItem?.bird_loss_batiment} />
                )
            }
        </div>
    );
};

export default BirdLossTable;

