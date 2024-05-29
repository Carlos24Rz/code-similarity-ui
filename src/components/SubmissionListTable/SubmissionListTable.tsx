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
import CreateSubmissionDialog from '../CreateSubmissionDialog/CreateSubmissionDialog';


// TODO: Implementar Tabla con Backend

interface Submission {
    id: number;
    filename: string;
    author: string;
    similarityStatus: number;
}

const dummy_authors = [
  "Eduardo",
  "Jose",
  "Sebastian",
  "Jesús",
  "Daniel",
  "Carlos"
]

function createDummyRows(numRows: number) {
    const rows: Submission[] = []

    for (let i = 0; i < numRows; i++) {
        const submissionFilename = `test${i + 1}.py`;
        const submissionAuthor = dummy_authors[Math.floor(Math.random() * 6)];
        const submissionSimilarityStatus = Math.floor(Math.random() * 100);

        rows.push({
            id: i,
            filename: submissionFilename,
            author: submissionAuthor,
            similarityStatus: submissionSimilarityStatus
        });
    }

    return rows;
}

const dummyTableCols: { id: keyof Submission, label: string }[] = [{ id: 'filename', label: 'Archivo' }, { id: 'author', label: 'Autor' }, { id: 'similarityStatus', label: 'Índice de similitud' }];

export default function SubmissionListTable() {
    const [order, setOrder] = React.useState<SortOrder>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Submission>('similarityStatus');
    const [page, setPage] = React.useState(0);
    const [dummyTableRows, setDummyTableRows] = React.useState<Submission[]>([]);
    const rowsPerPage = 10;

    React.useEffect(() => {
        setDummyTableRows(createDummyRows(30));
    }, [])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Submission,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleOpenSubmission = (
        submissionId: number
    ) => {
        // TODO: Open Submission
    }

    const reloadSubmissionList = () => {
        // TODO: Reload submissionList
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
                tableTitle='Entregas'
                addElement={<CreateSubmissionDialog onSubmit={reloadSubmissionList} />}
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
                              onClick={() => handleOpenSubmission(row.id)}
                            >
                                <TableCell>{row.filename}</TableCell>
                                <TableCell align='right'>{row.author}</TableCell>
                                <TableCell align='right'>
                                  <Chip
                                    label={`${row.similarityStatus}%`} 
                                    color={
                                      row.similarityStatus > 75 ?
                                        "error"
                                      : row.similarityStatus > 50 && row.similarityStatus < 75 ?
                                        "warning"
                                      : "primary"
                                    }
                                  />
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
