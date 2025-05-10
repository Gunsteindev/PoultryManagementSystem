import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import CustomerForm from '../form/CustomerForm';
import DynamicTableComponent from './DynamicTableComponent';


export interface ClientProp {
    client_id?: number;          
    client_name: string;
    client_company: string;
    client_telephone: string;
    client_email: string;
    client_position: string;
    client_location: string;
}

interface DataRow {
    id?: number;
    customerName: string,
    customerPosition: string,
    customerCompany: string,
    customerEmail: string,
    customerMobile: string,
    customerAddress: string,
    item: ClientProp;
}

interface CustomerTableProp {
    customerData: ClientProp[]
}


const CustomerTable = ({ customerData }: CustomerTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ClientProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<ClientProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: ClientProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: ClientProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!customerData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

     const columns = [
        { header: t("customer_tableHeader_customerName"), accessor: 'customerName' },
        { header: t("customer_tableHeader_customerPosition"), accessor: 'customerPosition' },
        { header: t("customer_tableHeader_customerCompany"), accessor: 'customerCompany' },
        { header: t("customer_tableHeader_customerEmail"), accessor: 'customerEmail' },
        { header: t("customer_tableHeader_customerMobile"), accessor: 'customerMobile' },
        { header: t("customer_tableHeader_customerAddress"), accessor: 'customerAddress' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    customerData.map((item: ClientProp) =>{
        data.push({
            id: item.client_id,
            customerName: item.client_name,
            customerPosition: item.client_position,
            customerCompany: item.client_company,
            customerEmail: item.client_email,
            customerMobile: item.client_telephone,
            customerAddress: item.client_location,
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
                <CustomerForm
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
                    deletedLabel={"client"} 
                    deletedID={deletedItem?.client_id}
                    deletedDataHeader={deletedItem?.client_name} />
                )
            }
        </div>
    );
};

export default CustomerTable;

