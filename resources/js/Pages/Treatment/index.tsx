import { useState } from 'react';
import { Plus, Syringe} from 'lucide-react'
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useTreatmentStore } from '@/lib/Stores/treatmentStore';
import TraitementForm from '../form/TreatmentForm';
import Dashboard from '../Dashboard';
import TreatmentTable from '../table/TreatmentTable';



const Traitement = () => {

    const [showDlg, setShowDlg] = useState(false)

    const { t, i18n } = useTranslation();
    const { treatments } = useTreatmentStore();

    const toggleShowDlg = (open: boolean) => {
        setShowDlg(open);
    };

    const handleDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowDlg(true); // Open the dialog (you can pass 'false' to close it)
    };

    return (
        <>
            <div className='p-10 space-y-20'>
                <div className='flex justify-between items-center'>
                    <div><h1 className='text-2xl font-semibold '>{t("treatment")}</h1></div>
                </div>
                <div className='space-y-5'>
                    <div className='flex space-x-5'>
                        <div className=''>
                            <button 
                                className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md' 
                                onClick={handleDialogToggle}
                            >
                                <Plus size={20} />
                                <span>{t("treatment_newTreatment")}</span>
                            </button>
                            {showDlg && <TraitementForm showDlg={showDlg} toggleDlg={toggleShowDlg}/>}
                        </div>
                    </div>
                </div>
                <div className='space-y-5'>
                    <div className='flex space-x-2 dark:text-gray-400'><Syringe /><span>{t("treatment_treatmentList")}</span></div>
                    <TreatmentTable treatmentData={treatments} />
                </div>
            </div>
        </>
    )
}

Traitement.layout = (page: ReactNode) => <Dashboard children={page} />
export default Traitement