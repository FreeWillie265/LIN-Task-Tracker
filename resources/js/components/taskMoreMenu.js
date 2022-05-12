import {useRef, useState} from 'react';
import {
    Icon,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from '@mui/material';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import AlertDialogSlide from './AlertDialogSlide';


export default function TaskMoreMenu({ task }) {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <AlertDialogSlide
                action={() => {}}
                open={editOpen}
                setOpen={setEditOpen}
                title="Edit Task"
                text={`Are you sure you want to edit task ${task.title}`}
            />


            <AlertDialogSlide
                action={() => {}}
                open={deleteOpen}
                setOpen={setDeleteOpen}
                title="Delete Task"
                text={`Are you sure you want to delete task ${task.title}`}
            />
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Icon icon={moreVerticalFill} width={20} height={20} />
            </IconButton>
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
                        setEditOpen(true);
                        setIsOpen(false);
                    }}
                    to="#"
                    sx={{ color: 'text.secondary' }}
                >
                    <ListItemIcon>
                        <Icon icon={editFill} width={24} height={24} />
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
                        <Icon icon={trash2Outline} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
                </MenuItem>
            </Menu>
        </>
    );
}
