import React from 'react';
import { useState } from 'react';
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TablePagination
} from '@mui/material';
import TaskListHead from './TaskListHead';
import TaskStatus from './TaskStatus';
import AddTaskModal from './AddTaskModal';


const columns = [
    { label: 'Title', id: 'title', alignRight: false },
    { label: 'Description', id: 'description', alignRight: false },
    { label: 'Due Date', id: 'dueDate', alignRight: false },
    { label: 'Completion Status', id: 'completionStatus', alignRight: false }
];
const tasks = [
    {
        title: 'Landing page Design',
        description: 'Create several wireframes of how the landing page will look like',
        dueDate: "11-July-2022",
        completionStatus: false
    },
    {
        title: 'User Editing',
        description: 'Provide Function to edit users',
        dueDate: "11-July-2022",
        completionStatus: false
    },
    {
        title: 'Deploy',
        description: 'Dockerize app and deploy in kubernetes',
        dueDate: "11-July-2022",
        completionStatus: false
    },
    {
        title: 'Code Review',
        description: 'Create a page where code reviewers write their findings and recommendations',
        dueDate: "11-July-2022",
        completionStatus: false
    }

];

function TaskList() {


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addTaskOpen, setAddTaskOpen] = useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <AddTaskModal open={addTaskOpen} setOpen={setAddTaskOpen} />
            <div className="card-header">
                <span className="float-sm-start">Tasks</span>
                <span className="float-sm-end">
                    <button
                        className="btn btn-success"
                        onClick={() => setAddTaskOpen(true)}
                    >
                        New Task
                    </button>
                </span>
            </div>
            <div className="card-body">
                <Table>
                    <TaskListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={columns}
                        rowCount={tasks.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                    />

                    <TableBody>
                        {tasks
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                            const {
                                title,
                                description,
                                dueDate
                            } = row;

                            return (
                                <TableRow
                                    hover
                                    key={title}
                                    tabIndex={-1}
                                >
                                    <TableCell component="th" scope="row">{title}</TableCell>
                                    <TableCell align="left">{description}</TableCell>
                                    <TableCell align="left">{dueDate}</TableCell>
                                    <TableCell align="left">
                                        <TaskStatus task={row} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    );
}

export default TaskList;
