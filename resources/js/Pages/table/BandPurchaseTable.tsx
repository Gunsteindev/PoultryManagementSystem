import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { usePage } from '@inertiajs/react';
import DeleteDialog from '../dialog/DeleteDialog';
import BandPurchaseForm from '../form/BandPurchaseForm';
import DynamicTableComponent from './DynamicTableComponent';


export interface BandPurchaseProp {
    band_id: number;
    band_purchase_band_code: string;
    band_purchase_code: string;
    band_purchase_date: string;             
    band_purchase_description: string;
    band_purchase_quantity: string;    
    band_purchase_reduction: string;   
    band_purchase_total_cost: string;  
    band_purchase_unit_price: string;  
}

interface DataRow {
    id: number,
    purchaseCode: string,
    bandCode: string,
    description: string,
    quantity: string,
    unitPrice: string,
    reduction: string,
    totalPrice: string,
    date: string,
    item: BandPurchaseProp
}

interface BandPurchaseTableProp {
    bandPurchaseData: BandPurchaseProp[];
}


const BandPurchaseTable = ({ bandPurchaseData }: BandPurchaseTableProp) => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];

    const { t, i18n } = useTranslation();

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BandPurchaseProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BandPurchaseProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BandPurchaseProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BandPurchaseProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!bandPurchaseData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("bird_tableHeader_bandpurchase_purchaseCode"), accessor: 'purchaseCode' },
        { header: t("bird_tableHeader_bandpurchase_bandCode"), accessor: 'bandCode' },
        { header: t("bird_tableHeader_bandpurchase_description"), accessor: 'description' },
        { header: t("bird_tableHeader_bandpurchase_quantity"), accessor: 'quantity' },
        { header: t("bird_tableHeader_bandpurchase_unitPrice"), accessor: 'unitPrice' },
        { header: t("bird_tableHeader_bandpurchase_reduction"), accessor: 'reduction' },
        { header: t("bird_tableHeader_bandpurchase_totalPrice"), accessor: 'totalPrice' },
        { header: t("bird_tableHeader_bandpurchase_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    bandPurchaseData.map((item: any) => {
        data.push({
            id: item.pickup_id,
            purchaseCode: item.band_purchase_code,
            bandCode: item.band_purchase_band_code,
            description: item.band_purchase_description,
            quantity: item.band_purchase_quantity,
            unitPrice: item.band_purchase_unit_price,
            reduction: item.band_purchase_reduction,
            totalPrice: item.band_purchase_total_cost,
            date: item.band_purchase_date,
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
                <BandPurchaseForm
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
                    deletedLabel={"bandpurchase"} 
                    deletedID={deletedItem?.band_id}
                    deletedDataHeader={deletedItem?.band_purchase_code} />
                )
            }
        </div>
    );
};

export default BandPurchaseTable;