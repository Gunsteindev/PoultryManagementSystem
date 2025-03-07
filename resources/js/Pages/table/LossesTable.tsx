import { useState, useRef } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash2, MapPin } from "lucide-react"
import { Checkbox } from "@/Components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/Components/ui/table"
import ProductDialog from "../dialog/ProductDialog"
import { Label } from "../../components/ui/label"
import ProductForm from '@/Pages/form/ProductForm';
import DeleteDialog from '@/Pages/dialog/DeleteDialog';
import { Button } from "@/components/ui/button"



const data: Payment[] = [
    {
        product_id: "m5gr24i9",
        sku: 389,
        product_name: "success",
        quantity: 20,
        price: 50.00,
        location: "New York"
    },
    {
        product_id: "m5gr85i9",
        sku: 276,
        product_name: "success",
        quantity: 20,
        price: 50.00,
        location: "New York"
    },
    {
        product_id: "m5gr14i9",
        sku: 319,
        product_name: "success",
        quantity: 20,
        price: 50.00,
        location: "New York"
    },
    {
        product_id: "m5gr84i7",
        sku: 216,
        product_name: "success",
        quantity: 20,
        price: 50.00,
        location: "New York"
    },
    {
        product_id: "m5gr86i9",
        sku: 346,
        product_name: "success",
        quantity: 20,
        price: 50.00,
        location: "New York"
    },
]

export type Payment = {
    // id: string
    // amount: number
    // status: "pending" | "processing" | "success" | "failed"
    // email: string
    product_id: string,
    sku: number,
    product_name: string,
    quantity: number,
    price: number,
    location: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "product_id",
        header: "ID",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("product_id")}</div>
        ),
    },
    {
        accessorKey: "sku",
        header: "Batiment",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("sku")}</div>
        ),
    },
    {
        accessorKey: "product_name",
        header: "Categorie",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("product_name")}</div>
        ),
    },
    {
        accessorKey: "quantity",
        header: "Quantite",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("quantity")}</div>
        ),
    },
    {
        accessorKey: "quantity",
        header: "Jour",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("quantity")}</div>
        ),
    },
    {
        accessorKey: "quantity",
        header: "Heure",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("quantity")}</div>
        ),
    },
    {
        accessorKey: "quantity",
        header: "User",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("quantity")}</div>
        ),
    },
    // {
    //     accessorKey: "email",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Email
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    // },
    
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            const [editForm, setEditForm] = useState(false)
            const [deleteDlg, setDeleteDlg] = useState(false)

            const title = useRef("")

            // const toggleShowForm = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>, open: boolean) => {
            //     title.current = "Edit task"
            //     e.stopPropagation()
            //     setShowForm(open);
            // }
            const toggleShowForm = (open: boolean) => {
                title.current = "EDIT PRODUCT"
                setEditForm(open);
            };

            const handleDialogToggle = (e: React.MouseEvent) => {
                e.stopPropagation(); // Stop event propagation
                toggleShowForm(true); // Open the dialog (you can pass 'false' to close it)
            };


            const toggleDeleteDlg = (open: boolean) => {
                setDeleteDlg(open);
            }
            const handleDeleteDialogToggle = (e: React.MouseEvent) => {
                e.stopPropagation(); // Stop event propagation
                toggleDeleteDlg(true); // Open the dialog (you can pass 'false' to close it)
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white w-40">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <div className='flex items-center space-x-3 text-dark-600'>
                                <Pencil size={12} className="text-[#8946A6]"/>
                                <Label className='cursor-pointer text-gray-600 text-sm' onClick={handleDialogToggle}>Edit</Label>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className='flex items-center space-x-3 text-dark-600'>
                                <Trash2 size={12} className="text-red-500"/>
                                <Label className='cursor-pointer text-gray-600 text-sm' onClick={handleDeleteDialogToggle}>Delete</Label>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    {editForm && <ProductForm title={title.current} showDlg={editForm} toggleDlg={toggleShowForm} />}
                    {deleteDlg && <DeleteDialog  deleteDlg={deleteDlg} toggleDeleteDlg={toggleDeleteDlg} />}
                </DropdownMenu>
            )
        },
    },
]

const LossesTable = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [showDlg, setShowDlg] = useState(false)
    const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    // const toggleShowDlg = () => {
    //     // title.current = "Edit task"
    //     setShowDlg(!showDlg);
    // }

    const toggleShowDlg = (open: boolean) => {
        setShowDlg(open);
    };

    const handleDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowDlg(true); // Open the dialog (you can pass 'false' to close it)
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="h-auto w-full bg-white dark:bg-slate-800 p-4 rounded-lg">
            {/* <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by product name..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> */}
            <div className="rounded-md">
                <Table>
                    <TableHeader className=" ">
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} className="text-black dark:text-white font-semibold uppercase">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={handleDialogToggle}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                        {/* {showDlg && (<ProductDialog showDlg={showDlg} toggleDlg={toggleShowDlg}/>)} */}
                    </TableBody>
                    
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LossesTable
