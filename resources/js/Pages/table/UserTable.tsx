import { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import DeleteDialog from '../dialog/DeleteDialog';
import TreatmentForm from '../form/TreatmentForm';
import DynamicTableComponent from './DynamicTableComponent';
import { usePage } from '@inertiajs/react';

export interface UserProp {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

interface DataRow {
    id: number;
    userName: string,
    userEmail: string,
    // userPassword: string,
    userRole: string,
    item: UserProp;
}

interface UserTableProp {
    userData: UserProp[];
}

const UserTable = ({ userData }: UserTableProp) => {

    const user = usePage().props.auth.user;

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<UserProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<UserProp | null>(null);
    const title = useRef("");

    const { t, i18n } = useTranslation();

    const toggleShowForm = (open: boolean, item?: UserProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: UserProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    if (!userData?.length) {
        return <p className="text-center py-4">{t("noDataAvailable")}</p>;
    }

    const columns = [
        { header: t("user_tableHeader_userName"), accessor: 'userName' },
        { header: t("user_tableHeader_userEmail"), accessor: 'userEmail' },
        // { header: t("user_tableHeader_userPassword"), accessor: 'userPassword' },
        { header: t("user_tableHeader_userRole"), accessor: 'userRole' },
    ];

    const data: DataRow[] = [
      // Example data rows can be added here if needed
    ];

    userData.map((item: any) =>{
        data.push({
            id: item.id,
            userName: item.name,
            userEmail: item.email,
            // userPassword: item.password,
            userRole: item.roles,
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
            {/* {editForm && (
                <TreatmentForm
                    title={title.current}
                    showDlg={editForm}
                    toggleDlg={setEditForm}
                    selectedData={selectedItem}
                />
            )} */}
            {deleteDlg && (
                <DeleteDialog
                    deleteDlg={deleteDlg}
                    toggleDeleteDlg={toggleDeleteDlg}
                    deletedLabel="users"
                    deletedID={deletedItem?.id}
                    deletedDataHeader={deletedItem?.name}
                />
            )}
        </div>
    );
};

export default UserTable;
