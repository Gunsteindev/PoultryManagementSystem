import { useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import EggSaleForm from '../form/EggSaleForm';
import DynamicTableComponent from './DynamicTableComponent';
  

export interface EggSaleProp {
    eggsale_id: number;
    eggsale_code: string;
    eggsale_date: string;               
    eggsale_description: string;
    eggsale_client_name: string;
    eggsale_quantity: string;           
    eggsale_reduction: string;          
    eggsale_total_cost: string;         
    eggsale_unit_price: string;         
}

interface DataRow {
    id?: number;
    saleCode: string;
    description: string;
    quantity: string;
    unitPrice: string;
    reduction: string;
    totalPrice: string;
    customer: string;
    date: string;
    item: EggSaleProp;
}

export interface EggSaleResponse {
    data: EggSaleProp[];
}

interface EggSaleTableProp {
    eggsaleData: EggSaleProp[];
}


const EggSaleTable = ({ eggsaleData }: EggSaleTableProp) => {

    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<EggSaleProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<EggSaleProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: EggSaleProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: EggSaleProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!eggsaleData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("egg_tableHeader_eggsale_saleCode"), accessor: 'saleCode' },
        { header: t("egg_tableHeader_eggsale_description"), accessor: 'description' },
        { header: t("egg_tableHeader_eggsale_quantity"), accessor: 'quantity' },
        { header: t("egg_tableHeader_eggsale_unitPrice"), accessor: 'unitPrice' },
        { header: t("egg_tableHeader_eggsale_reduction"), accessor: 'reduction' },
        { header: t("egg_tableHeader_eggsale_totalPrice"), accessor: 'totalPrice' },
        { header: t("egg_tableHeader_eggsale_customer"), accessor: 'customer' },
        { header: t("egg_tableHeader_eggsale_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    eggsaleData.map((item: EggSaleProp) =>{
        data.push({
            id: item.eggsale_id,
            saleCode: item.eggsale_code,
            description: item.eggsale_description,
            quantity: item.eggsale_quantity,
            unitPrice: item.eggsale_unit_price,
            reduction: item.eggsale_reduction,
            totalPrice: item.eggsale_total_cost,
            customer: item.eggsale_client_name,
            date: item.eggsale_date,
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
                <EggSaleForm
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
                    deletedLabel={"eggsale"} 
                    deletedID={deletedItem?.eggsale_id}
                    deletedDataHeader={deletedItem?.eggsale_code} />
                )
            }
        </div>
    );
};

export default EggSaleTable;

