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


// TODO: Implementar Tabla con Backend

interface Homework {
    id: number,
    title: string,
    submissions: number,
    similarityStatus: 0 | 1 | 2 | 3
}


function createDummyRows(numRows: number) {
    const rows: Homework[] = []

    for (let i = 0; i < numRows; i++) {
        const homeworkTitle = `Tarea ${i + 1}`;
        const homeworkSubmissions = Math.floor(Math.random() * 30);
        let homeworkSimilarityStatus = 0 as 0 | 1 | 2 | 3;

        if (homeworkSubmissions !== 0) {
            homeworkSimilarityStatus = Math.floor(Math.random() * 3) + 1 as 0 | 1 | 2 | 3;
        }

        rows.push({
            id: i,
            title: homeworkTitle,
            submissions: homeworkSubmissions,
            similarityStatus: homeworkSimilarityStatus
        });
    }

    return rows;
}

const dummyTableCols: { id: keyof Homework, label: string }[] = [{ id: 'title', label: 'Título' }, { id: 'submissions', label: 'Entregas' }, { id: 'similarityStatus', label: 'Similitud entre entregas' }];

export default function HomeworkListTable() {
    const [order, setOrder] = React.useState<SortOrder>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Homework>('similarityStatus');
    const [page, setPage] = React.useState(0);
    const [dummyTableRows, setDummyTableRows] = React.useState<Homework[]>([]);
    const rowsPerPage = 10;

    React.useEffect(() => {
        setDummyTableRows(createDummyRows(30));
    }, [])

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

    const handleNewHomework = (event: React.MouseEvent<HTMLButtonElement>) => {
        // TODO: Create New Homework
    }

    const handleOpenHomework = (
        homeworkId: number
    ) => {
        // TODO: Open Homework
    }

    const visibleRows = React.useMemo(
        () => sortArray(dummyTableRows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, dummyTableRows],
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
                addMessage='Crear Tarea'
                onAddItem={handleNewHomework}
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
                              key={row.id}
                              hover
                              onClick={() => handleOpenHomework(row.id)}
                            >
                                <TableCell>{row.title}</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component='div'
                count={dummyTableRows.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>

    )
}