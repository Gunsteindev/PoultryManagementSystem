import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Separator } from "@/Components/ui/separator"

interface ProductDialogProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    
}

const ProductDialog = ({ showDlg, toggleDlg}: ProductDialogProp) => {

   
    return (
        <Dialog open={showDlg} onOpenChange={toggleDlg}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-[#8946A6]">PRODUCT DETAILS</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="flex space-x-10">
                    <div><img className="h-64" src="/image/dummy.png" alt="" /></div>
                    <div className="space-y-4 text-sm items-center">
                        <div className="space-x-3"><span>Product ID:</span><span className="font-semibold">m5gr24i9</span></div>
                        <div className="space-x-3"><span>Brand:</span><span className="font-semibold">Nike</span></div>
                        <div className="space-x-3"><span>Product Name:</span><span className="font-semibold">success</span></div>
                        <div className="space-x-3"><span>Category:</span><span className="font-semibold">fitness</span></div>
                        <div className="space-x-3"><span>Price:</span><span className="font-semibold">$50.00</span></div>
                        <div className="space-x-3"><span>Location:</span><span className="font-semibold">New York</span></div>
                        <div className="space-x-3"><span>Sku:</span><span className="font-semibold">389</span></div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDialog
