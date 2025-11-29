'use client';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    TablePagination, 
    Box, 
    IconButton, 
    TableSortLabel 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useMemo } from 'react';

type Order = 'asc' | 'desc';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: any) => string;
}

interface StyledTableProps {
    columns: Column[];
    rows: any[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onDetails?: (id: string) => void;
}

const StyledTable = ({ columns, rows, onEdit, onDelete, onDetails }: StyledTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>(columns[0].id);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedRows = useMemo(() => {
        const comparator = (a: any, b: any) => {
            const valueA = a[orderBy];
            const valueB = b[orderBy];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            }
            // date
            const dateA = new Date(valueA).getTime();
            const dateB = new Date(valueB).getTime();
            if (!isNaN(dateA) && !isNaN(dateB)) {
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            }

            return 0;
        };
        return [...rows].sort(comparator);
    }, [rows, order, orderBy]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 640 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleRequestSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="right">
                                            {onDetails && <IconButton onClick={() => onDetails(row.id)}><InfoIcon /></IconButton>}
                                            {onEdit && <IconButton onClick={() => onEdit(row.id)}><EditIcon /></IconButton>}
                                            {onDelete && <IconButton onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Itens por página"
            />
        </Paper>
    );
};

export default StyledTable;