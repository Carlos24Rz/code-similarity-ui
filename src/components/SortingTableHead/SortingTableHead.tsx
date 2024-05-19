import * as React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { SortOrder } from '@/utils/sort';

interface Props<T> {
    columns: {label: string; id: keyof T}[];
    order: SortOrder;
    orderBy: keyof T;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

export default function SortingTableHead<T>(props: Props<T>){
    const {columns, order, orderBy, onRequestSort} = props;

    const handleSortOnClick = (orderLabel: keyof T) => {
        return (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, orderLabel);
        }
    }

    return (
        <TableHead
          sx={{
            boxShadow: 1
          }}
        >
            <TableRow>
                {columns.map((column , idx) => (
                    <TableCell
                      key={column.id as string}
                      align={idx === 0 ? 'left' : 'right'}
                    >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={handleSortOnClick(column.id)}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                              <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </Box>
                            ) : null}
                        </TableSortLabel>
                        
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}