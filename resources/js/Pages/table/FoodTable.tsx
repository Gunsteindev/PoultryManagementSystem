import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import FoodForm from '../form/FoodForm';
import DynamicTableComponent from './DynamicTableComponent';

export interface FoodProp {
    food_code: string;
    food_discount: string;          
    food_id?: number;
    food_name: string;
    food_price_per_bag: string;     
    food_purchase_date: string;   
    food_quantity: string;          
    food_supplier_name: string;
    food_total_cost: string;        
}

interface DataRow {
    id?: number;
    foodPurchaseCode: string,
    foodName: string,
    supplier: string,
    price: string,
    quantity: string,
    reduction: string,
    totalPrice: string,
    date: string,
    item: FoodProp;
}

interface FoodTableProp {
    foodData: FoodProp[];
}


const FoodTable = ({ foodData }: FoodTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FoodProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<FoodProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: FoodProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: FoodProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!foodData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("food_tableHeader_food_foodPurchaseCode"), accessor: 'foodPurchaseCode' },
        { header: t("food_tableHeader_food_foodName"), accessor: 'foodName' },
        { header: t("food_tableHeader_food_supplier"), accessor: 'supplier' },
        { header: t("food_tableHeader_food_price"), accessor: 'price' },
        { header: t("food_tableHeader_food_quantity"), accessor: 'quantity' },
        { header: t("food_tableHeader_food_reduction"), accessor: 'reduction' },
        { header: t("food_tableHeader_food_totalPrice"), accessor: 'totalPrice' },
        { header: t("food_tableHeader_food_date"), accessor: 'date' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    foodData.map((item: FoodProp) =>{
        data.push({
            id: item.food_id,
            foodPurchaseCode: item.food_code,
            foodName: item.food_name,
            supplier: item.food_supplier_name,
            price: item.food_price_per_bag,
            quantity: item.food_quantity,
            reduction: item.food_discount,
            totalPrice: item.food_total_cost,
            date: item.food_purchase_date,
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
                <FoodForm
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
                    deletedLabel={"foodPurchase"} 
                    deletedID={deletedItem?.food_id}
                    deletedDataHeader={deletedItem?.food_name} />
                )
            }
        </div>
    );
};

export default FoodTable;

