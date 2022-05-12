import React, {useEffect} from 'react';
import { useState } from 'react';
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TablePagination, IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import TaskListHead from './TaskListHead';
import TaskStatus from './TaskStatus';
import AddTaskModal from './AddTaskModal';
import TaskMoreMenu from './taskMoreMenu';


const columns = [
    { label: 'Title', id: 'title', alignRight: false },
    { label: 'Description', id: 'description', alignRight: false },
    { label: 'Due Date', id: 'dueDate', alignRight: false },
    { label: 'Completion Status', id: 'completionStatus', alignRight: false }
];

function TaskList() {


    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('title');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/tasks').then(
            (response) => {
                setTasks(response.data);
            },
            (error) => console.log(error)
        );
    }, []);

    useEffect(() => {
        axios.get('/users').then(
            (response) => {
                setUsers(response.data)
            },
            (error) => console.log(error)
        )
    }, []);

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
            <AddTaskModal open={addTaskOpen} setOpen={setAddTaskOpen} users={users}/>
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
                                    <TableCell align="left">{moment(dueDate).format('MMM-DD-YYYY')}</TableCell>
                                    <TableCell align="left">
                                        <TaskStatus task={row} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <TaskMoreMenu task={row} users={users}/>
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
