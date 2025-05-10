import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { usePage } from '@inertiajs/react';
import DeleteDialog from '../dialog/DeleteDialog';
import BirdSaleForm from '../form/BirdSaleForm';
import DynamicTableComponent from './DynamicTableComponent';

export interface BirdSaleProp {
    bird_sale_batiment_code: string;
    bird_sale_code: string;
    bird_sale_date: string; 
    bird_sale_description: string;
    bird_sale_id: number;
    bird_sale_quantity: string;  
    bird_sale_reduction: string;  
    bird_sale_total_cost: string;  
    bird_sale_unit_price: string;  
}

interface DataRow {
    id: number,
    saleCode: string,
    roomCode: string,
    description: string,
    quantity: string,
    unitPrice: string,
    reduction: string,
    totalPrice: string,
    date: string,
    item: BirdSaleProp
}

interface BirdSaleTableProp {
    birdSaleData: BirdSaleProp[];
}


const BirdSaleTable = ({ birdSaleData }: BirdSaleTableProp) => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];

    const { t, i18n } = useTranslation();

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<BirdSaleProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<BirdSaleProp | null>(null);
    const title = useRef("");

    const toggleShowForm = (open: boolean, item?: BirdSaleProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: BirdSaleProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!birdSaleData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("bird_tableHeader_birdSale_saleCode"), accessor: 'saleCode' },
        { header: t("bird_tableHeader_birdSale_roomCode"), accessor: 'roomCode' },
        { header: t("bird_tableHeader_birdSale_description"), accessor: 'description' },
        { header: t("bird_tableHeader_birdSale_quantity"), accessor: 'quantity' },
        { header: t("bird_tableHeader_birdSale_unitPrice"), accessor: 'unitPrice' },
        { header: t("bird_tableHeader_birdSale_reduction"), accessor: 'reduction' },
        { header: t("bird_tableHeader_birdSale_totalPrice"), accessor: 'totalPrice' },
        { header: t("bird_tableHeader_birdSale_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    birdSaleData.map((item: any) => {
        data.push({
            id: item.bird_sale_id,
            saleCode: item.bird_sale_code,
            roomCode: item.bird_sale_batiment_code,
            description: item.bird_sale_description,
            quantity: item.bird_sale_quantity,
            unitPrice: item.bird_sale_unit_price,
            reduction: item.bird_sale_reduction,
            totalPrice: item.bird_sale_total_cost,
            date: item.bird_sale_date,
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
                <BirdSaleForm
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
                    deletedLabel={"birdsale"} 
                    deletedID={deletedItem?.bird_sale_id}
                    deletedDataHeader={deletedItem?.bird_sale_code} />
                )
            }
        </div>
    );
};

export default BirdSaleTable;