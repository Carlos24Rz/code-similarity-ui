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
import { HomeworkSubmission } from '@/lib/definitions';
import { usePathname, useRouter } from 'next/navigation';
import { reloadSubmissionList } from '@/app/actions';

const dummyTableCols: { id: keyof HomeworkSubmission, label: string }[] = [{ id: 'filename', label: 'Archivo' }, { id: 'author', label: 'Autor' }, { id: 'similarityStatus', label: 'Índice de similitud' }];

interface Props {
    submissionList: HomeworkSubmission[]
}

export default function SubmissionListTable(props: Props) {
    const { submissionList } = props;
    const router = useRouter();
    const pathname = usePathname();

    const [order, setOrder] = React.useState<SortOrder>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof HomeworkSubmission>('similarityStatus');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof HomeworkSubmission,
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
        router.push(`${pathname}/submission/${submissionId}`);
    }

    const reloadSubmissionListHandle = () => {
      reloadSubmissionList(pathname);
    }

    const visibleRows = React.useMemo(
        () => sortArray(submissionList, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, submissionList],
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
                addElement={<CreateSubmissionDialog onSubmit={reloadSubmissionListHandle} />}
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
                count={submissionList.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>

    )
}
