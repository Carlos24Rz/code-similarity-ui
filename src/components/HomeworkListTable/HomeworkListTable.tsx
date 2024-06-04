'use client';
import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    Chip
} from '@mui/material';
import { SortOrder, getComparator, sortArray } from '@/utils/sort';
import SortingTableHead from '../SortingTableHead/SortingTableHead';
import TableToolbar from '../TableToolbar/TableToolbar';
import CreateHomeworkDialog from '../CreateHomeworkDialog/CreateHomeworkDialog';
import { Homework } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { reloadHomeworkList } from '@/app/actions';

// TODO: Update With more columns
const dummyTableCols: { id: keyof Homework, label: string }[] = [{ id: 'name', label: 'Título' }];


interface Props {
    homeworkList: Homework[];
}

export default function HomeworkListTable(props: Props) {
    const { homeworkList } = props;
    const router = useRouter();

    const [order, setOrder] = React.useState<SortOrder>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Homework>('name');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Homework,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleOpenHomework = (
        homeworkId: string
    ) => {
        router.push(`/homework/${homeworkId}`);
    }

    const handleOnHomeworkSubmit = () => {
        reloadHomeworkList();
    }

    const visibleRows = React.useMemo(
        () => sortArray(homeworkList, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, homeworkList],
    );

    return (
        <Paper
          sx={{
            pt: 1,
            px: 3
          }}
        
        >
            <TableToolbar
                tableTitle='Tareas'
                addElement={<CreateHomeworkDialog onSubmit={handleOnHomeworkSubmit}/>}
            />
            <TableContainer>
                <Table>
                    <SortingTableHead
                        columns={dummyTableCols}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {visibleRows.map((row) => (
                            <TableRow
                              sx={{
                                cursor: 'pointer'
                              }}
                              key={row.homework_id}
                              hover
                              onClick={() => handleOpenHomework(row.homework_id)}
                            >
                                <TableCell>{row.name}</TableCell>
                                {/*
                                <TableCell align='right'>{row.submissions}</TableCell>
                                <TableCell align='right'>
                                    {row.similarityStatus === 3 ? (
                                        <Chip label='Alto' color='error' />
                                    ) : row.similarityStatus === 2 ? (
                                        <Chip label='Medio' color='warning' />
                                    ) : row.similarityStatus === 1 ? (
                                        <Chip label='Bajo' color='primary' />
                                    ) : (
                                        <Chip
                                          sx={{
                                            backgroundColor: '#EDEEF0'
                                          }}
                                          label='N/A'
                                        />
                                    )}
                                </TableCell>
                                */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component='div'
                count={homeworkList.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>

    )
}
