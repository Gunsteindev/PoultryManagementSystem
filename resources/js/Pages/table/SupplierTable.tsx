import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import SupplierForm from '../form/SupplierForm';
import DynamicTableComponent from './DynamicTableComponent';

export interface SupplierProp {
    supplier_id?: number;
    supplier_name: string;
    supplier_company: string;
    supplier_address: string;
    supplier_position: string;
    supplier_role: string;
    supplier_telephone: string;
}

interface DataRow {
    id?: number;
    supplierName: string,
    supplierPosition: string,
    supplierCompany: string,
    supplierEmail: string,
    supplierMobile: string,
    supplierAddress: string,
    item: SupplierProp;
}

interface SupplierTableProp {
    supplierData: SupplierProp[];
}

const SupplierTable = ({ supplierData }: SupplierTableProp) => {

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SupplierProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<SupplierProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: SupplierProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: SupplierProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!supplierData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("supplier_tableHeader_supplierName"), accessor: 'supplierName' },
        { header: t("supplier_tableHeader_supplierPosition"), accessor: 'supplierPosition' },
        { header: t("supplier_tableHeader_supplierCompany"), accessor: 'supplierCompany' },
        { header: t("supplier_tableHeader_supplierEmail"), accessor: 'supplierEmail' },
        { header: t("supplier_tableHeader_supplierMobile"), accessor: 'supplierMobile' },
        { header: t("supplier_tableHeader_supplierAddress"), accessor: 'supplierAddress' },
    ];

    const data: DataRow[] = [
        // Example data rows can be added here if needed
    ];

    supplierData.map((item: SupplierProp) =>{
        data.push({
            id: item.supplier_id,
            supplierName: item.supplier_name,
            supplierPosition: item.supplier_position,
            supplierCompany: item.supplier_company,
            supplierEmail: item.supplier_role,
            supplierMobile: item.supplier_address,
            supplierAddress: item.supplier_telephone,
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
                <SupplierForm
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
                    deletedLabel={"supplier"} 
                    deletedID={deletedItem?.supplier_id}
                    deletedDataHeader={deletedItem?.supplier_name} />
                )
            }
        </div>
    );
};

export default SupplierTable;

