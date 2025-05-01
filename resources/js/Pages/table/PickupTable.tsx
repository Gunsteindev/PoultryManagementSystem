import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import ProductForm from '../form/ProductForm';
import DynamicTableComponent from './DynamicTableComponent';

export interface PickupProp {
    pickup_id: number;
    pickup_code: string;
    pickup_batiment: string;
    pickup_date: string | Date;                
    pickup_crate_quantity: string | number;      
    pickup_quantity_loss: string | number;       
    pickup_quantity_remain: string | number;     
    pickup_total_quantity: string | number;      
}

interface DataRow {
    id: number,
    pickupCode: string,
    roomCode: string,
    numberOfCrate: string,
    loss: string,
    eggRemained: string,
    totalNumberofEggs: string,
    date: string,
    item: PickupProp
}

interface PickupTableProp {
    pickupData: PickupProp[];
}


const PickupTable = ({ pickupData }: PickupTableProp) => {

    const { t, i18n } = useTranslation();

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PickupProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<PickupProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: PickupProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: PickupProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!pickupData?.length) {
        return <p className="text-center py-4">{t("egg_noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("egg_tableHeader_pickup_pickupCode"), accessor: 'pickupCode' },
        { header: t("egg_tableHeader_pickup_roomCode"), accessor: 'roomCode' },
        { header: t("egg_tableHeader_pickup_numberOfCrate"), accessor: 'numberOfCrate' },
        { header: t("egg_tableHeader_pickup_loss"), accessor: 'loss' },
        { header: t("egg_tableHeader_pickup_eggRemained"), accessor: 'eggRemained' },
        { header: t("egg_tableHeader_pickup_totalNumberofEggs"), accessor: 'totalNumberofEggs' },
        { header: t("egg_tableHeader_pickup_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    pickupData.map((item: any) => {
        data.push({
            id: item.pickup_id,
            pickupCode: item.pickup_code,
            roomCode: item.pickup_batiment,
            numberOfCrate: item.pickup_crate_quantity,
            loss: item.pickup_quantity_loss,
            eggRemained: item.pickup_quantity_remain,
            totalNumberofEggs: item.pickup_total_quantity,
            date: item.pickup_date,
            item: item
        });
    });

    const handleUpdate = (row: Record<string, any>) => {
        // console.log('Update row:', row);
        data.forEach((item) => {
            if (item.id === row.id) {
                item.pickupCode = row.pickupCode
                item.roomCode = row.roomCode
                item.numberOfCrate = row.numberOfCrate
                item.loss = row.loss
                item.eggRemained = row.eggRemained
                item.totalNumberofEggs = row.totalNumberofEggs
                item.date = row.date

                toggleShowForm(true, item.item);
            }
        }
    )};
    
    const handleDelete = (row: Record<string, any>) => {
        // console.log('Delete row:', row);
        data.forEach((item) => {
            if (item.id === row.id) {
                item.pickupCode = row.pickupCode
                item.roomCode = row.roomCode
                item.numberOfCrate = row.numberOfCrate
                item.loss = row.loss
                item.eggRemained = row.eggRemained
                item.totalNumberofEggs = row.totalNumberofEggs
                item.date = row.date

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
                <ProductForm
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
                    deletedLabel={"pickup"} 
                    deletedID={deletedItem?.pickup_id}
                    deletedDataHeader={deletedItem?.pickup_code} 
                />
            )}
        </div>
    );
};

export default PickupTable;