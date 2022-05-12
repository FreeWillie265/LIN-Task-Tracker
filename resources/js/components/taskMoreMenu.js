import React, {useRef, useState} from 'react';
import {
    Grid,
    Icon,
    IconButton, ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import AlertDialogSlide from './AlertDialogSlide';
import EditTaskModal from './EditTaskModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewTaskModal from './ViewTaskModal';
import AddCommentModal from './AddCommentModal';


export default function TaskMoreMenu({ task, users, reload }) {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [addedComment, setAddedComment] = useState(false);

    function editTask() {
        setEditModalOpen(true);
    }

    const reloadComments = () => {
        setAddedComment(!addedComment);
    }

    function deleteTask() {
        axios.delete(`tasks/${task.id}`).then(
            (response) => {
                console.log(response.data);
                reload();
            },
            (error) => console.log(error)
        );
    }

    return (
        <>
            <ViewTaskModal open={viewOpen} setOpen={setViewOpen} task={task} reload={addedComment}/>
            <AlertDialogSlide
                action={() => editTask()}
                open={editOpen}
                setOpen={setEditOpen}
                title="Edit Task"
                text={`Are you sure you want to edit task ${task.title}`}
            />


            <AlertDialogSlide
                action={() => deleteTask()}
                open={deleteOpen}
                setOpen={setDeleteOpen}
                title="Delete Task"
                text={`Are you sure you want to delete task ${task.title}`}
            />

            <EditTaskModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                task={task}
                users={users}
                reload={reload}
            />

            <AddCommentModal
                open={commentOpen}
                setOpen={setCommentOpen}
                task={task}
                reload={reloadComments}
            />
            <ListItem>
                <IconButton onClick={() => setViewOpen(true)}>
                    <VisibilityIcon />
                </IconButton>
                <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                    <MoreVertIcon />
                </IconButton>
            </ListItem>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    onClick={() => {
                        setCommentOpen(true);
                        setIsOpen(false);
                    }}
                    to="#"
                    sx={{ color: 'text.secondary' }}
                >
                    <ListItemIcon>
                        <CommentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comment" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setEditOpen(true);
                        setIsOpen(false);
                    }}
                    to="#"
                    sx={{ color: 'text.secondary' }}
                >
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        setDeleteOpen(true);
                        setIsOpen(false);
                    }}
                    sx={{ color: 'text.secondary' }}
                >
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
            </Menu>
        </>
    );
}
