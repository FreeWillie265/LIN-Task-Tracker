import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import CustomSwitch from './CustomSwitch';
import AlertDialogSlide from './AlertDialogSlide';

export default function TaskStatus({ task }) {
    const [active, setActive] = useState(task.completionStatus);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState('hidden');
    const dispatch = useDispatch();

    const changeActiveStatus = () => {
        setLoading('visible');
        setActive(active === 1 ? 0 : 1);
        axios.patch(`/toggle-completion-status/${task.id}`, {'status': active === 1 ? 0 : 1}).then(
            (response) => {
                console.log(response.data)
                setLoading('hidden');
            },
            (error) => {
                console.log(error);
                setLoading('hidden')
            }
        );
    };

    return (
        <>
            <AlertDialogSlide
                action={changeActiveStatus}
                open={openDialog}
                setOpen={setOpenDialog}
                title="Status Change"
                text={`Are you sure you want to change ${task.title}'s completion status?`}
            />
            <CustomSwitch checked={active === 1} setChecked={() => setOpenDialog(true)} color="info" />
            <CircularProgress color="info" style={{ visibility: loading }} thickness={1} />
        </>
    );
}
