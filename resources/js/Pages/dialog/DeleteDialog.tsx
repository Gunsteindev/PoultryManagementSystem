import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";
import { Separator } from "@/Components/ui/separator";
import { useToast } from '@/Components/hooks/use-toast';
import { useClientStore } from "@/lib/Stores/customerStore";
import { useSupplierStore } from "@/lib/Stores/supplierStore";
import { useFoodStore } from "@/lib/Stores/foodStore";
import { useBatimentStore } from "@/lib/Stores/batimentStore";
import { useTransferStore } from "@/lib/Stores/transferStore";
import { useBandPurchaseStore } from "@/lib/Stores/bandPurchaseStore";
import { useConsomationStore } from "@/lib/Stores/consomationStore";
import { useTreatmentStore } from "@/lib/Stores/treatmentStore";
import { useBirdSaleStore } from "@/lib/Stores/birdSaleStore";
import { useEggSaleStore } from "@/lib/Stores/eggSaleStore";
import { usePickupStore } from "@/lib/Stores/pickupStore";
import { useBirdLossStore } from "@/lib/Stores/BirdLossStore";


interface DeleteDialogProps {
    deleteDlg: boolean;
    toggleDeleteDlg: (open: boolean) => void;
    deletedDataHeader?: string;
    deletedID?: string | number;
    deletedLabel?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({  deleteDlg, toggleDeleteDlg, deletedDataHeader, deletedID, deletedLabel }) => {

    const { toast } = useToast();
    const { deleteClient } = useClientStore();
    const { deleteSupplier } = useSupplierStore();
    const { deleteFood } = useFoodStore();
    const { deleteBatiment } = useBatimentStore();
    const { deleteTransfer } = useTransferStore();
    const { deleteBandPurchase } = useBandPurchaseStore();
    const { deleteConsomation } = useConsomationStore();
    const { deleteTreatment } = useTreatmentStore();
    const { deleteBirdSale } = useBirdSaleStore();
    const { deleteEggSale } = useEggSaleStore();
    const { deletePickup } = usePickupStore();
    const { deleteBirdLoss } = useBirdLossStore()


    const handleDelete = async () => {

        switch (deletedLabel) {
            case "client":
                await deleteClient(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });
          
            case "supplier":
                await deleteSupplier(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });
          
            case "foodPurchase":
                await deleteFood(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });
            
            case "batiment":
                await deleteBatiment(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });
                
            case "transfer":
                await deleteTransfer(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            case "bandpurchase":
                await deleteBandPurchase(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            case "consomation":
                await deleteConsomation(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            case "treatment":
                await deleteTreatment(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            case "birdsale":
                await deleteBirdSale(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });
                
            case "eggsale":
                await deleteEggSale(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            case "pickup":
                await deletePickup(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            case "birdloss":
                await deleteBirdLoss(deletedID as number);
                return toast({ description: `${deletedDataHeader} deleted successfully.` });

            default:
              console.error(`Unknown label: ${deletedLabel}`);
              return toast({ description: `Failed to delete: Unknown label "${deletedLabel}".` });
        }
          

    };

    return (
        <AlertDialog open={deleteDlg} onOpenChange={toggleDeleteDlg}>
            <AlertDialogContent className="dark:bg-slate-800 border-none">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex space-x-2 text-red-600">
                        <TriangleAlert />
                        <h1>DELETE - {deletedDataHeader?.toUpperCase()}</h1>
                    </AlertDialogTitle>
                    <Separator />
                    <AlertDialogDescription className="text-gray-600 text-base dark:text-white">
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-orange-600" onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
