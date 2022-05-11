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
        setActive(!active);
        /*dispatch(changeUserActivity(task)).then(
            (response) => {
                setActive(!active);
                dispatch(getAllUsers());
                setLoading('hidden');
                return response;
            },
            (error) => {
                setLoading('hidden');
                return error;
            }
        );*/
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
            <CustomSwitch checked={active} setChecked={() => setOpenDialog(true)} color="info" />
            {/* <CircularProgress color="info" style={{ visibility: loading }} thickness={1} /> */}
        </>
    );
}
