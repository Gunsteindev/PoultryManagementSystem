import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PencilOff, Trash2, Printer } from 'lucide-react';
import DeleteDialog from '../dialog/DeleteDialog';
import EggSaleForm from '../form/EggSaleForm';
import { usePage } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
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
    id: number;
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
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 5;
    // const totalPages = eggsaleData ? Math.ceil(eggsaleData.length / itemsPerPage) : 0;
    // const currentItems = eggsaleData?.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // ) || [];

    const { t, i18n } = useTranslation();

    const [editForm, setEditForm] = useState(false);
    const [deleteDlg, setDeleteDlg] = useState(false);
    const [selectedItem, setSelectedItem] = useState<EggSaleProp | null>(null);
    const [deletedItem, setDeletedItem] = useState<EggSaleProp | null>(null);
    const title = useRef("");

    const roles = user.data.roles[0];

    const toggleShowForm = (open: boolean, item?: EggSaleProp) => {
        setEditForm(open);
        setSelectedItem(item || null);
    };

    const toggleDeleteDlg = (open: boolean, item?: EggSaleProp) => {
        setDeleteDlg(open);
        setDeletedItem(item || null);
    };

    // const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

    if (!eggsaleData?.length) {
        return <p className="text-center py-4">{t("egg_noDataAvailable")}</p>;
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

    eggsaleData.map((item: any) =>{
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
            item.saleCode = row.saleCode;
            item.description = row.description;
            item.quantity = row.quantity;
            item.unitPrice = row.unitPrice;
            item.reduction = row.reduction;
            item.totalPrice = row.totalPrice;
            item.customer = row.customer;
            item.date = row.date;

            toggleShowForm(true, item.item);
            }
        }
    )};
    
    const handleDelete = (row: Record<string, any>) => {
        console.log('Delete row:', row);
        data.forEach((item) => {
            if (item.id === row.id) {
                item.saleCode = row.saleCode;
                item.description = row.description;
                item.quantity = row.quantity;
                item.unitPrice = row.unitPrice;
                item.reduction = row.reduction;
                item.totalPrice = row.totalPrice;
                item.customer = row.customer;
                item.date = row.date;

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

            {/* <table style={{ width: '100%', borderCollapse: 'collapse' }} className='bg-white dark:bg-slate-800'>
                <thead>
                    <tr>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_saleCode")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_description")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_quantity")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_unitPrice")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_reduction")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_totalPrice")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_customer")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>{t("egg_tableHeader_eggsale_date")}</th>
                        <th className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any) => (
                        <tr key={item.eggsale_id}>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_code}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_description}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_quantity}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_unit_price}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_reduction}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_total_cost}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_client_name}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>{item.eggsale_date}</td>
                            <td className='text-start border dark:border-gray-700 rounded-xl ps-2 py-3 text-sm'>
                                <div className='flex justify-start space-x-4'>
                                    <Button
                                        className='bg-orange-500 shadow-none'
                                        onClick={() => toggleShowForm(true, item)}
                                    >
                                        <PencilOff size={20} />
                                    </Button>
                                    {(roles === 'Admin' || roles === 'Supervisor') && (
                                        <>
                                            <Button
                                                className='bg-red-500 shadow-none'
                                                onClick={() => toggleDeleteDlg(true, item)}
                                            >
                                                <Trash2 size={20} />
                                            </Button>
                                        </>
                                    )}
                                    
                                    <Button
                                        className='bg-gray-500 shadow-none'
                                        // onClick={() => toggleDeleteDlg(true, item)}
                                    >
                                        <Printer size={20} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            {/* <div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <button
                        key={pageNumber}
                        style={{
                            padding: '10px',
                            margin: '5px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: currentPage === pageNumber + 1 ? '#007bff' : '#fff',
                            color: currentPage === pageNumber + 1 ? '#fff' : '#007bff',
                            cursor: 'pointer',
                        }}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div> */}
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

