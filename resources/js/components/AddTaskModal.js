import * as React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function AddTaskModal({open, setOpen, users, reload}) {
    const handleClose = () => setOpen(false);

    const AddTaskSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Task Title is Required'),
        description: Yup.string(),
        dueDate: Yup.date().required('Due Date is Required')
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dueDate: '',
            assignedUser: '',
            completionStatus: 0
        },
        validationSchema: AddTaskSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(`Submitting ${JSON.stringify(values)}`);

            axios.post('/tasks', values).then(
                (response) => {
                    console.log(response.data)
                    setSubmitting(false);
                    reload();
                    handleClose();
                },
                (error) => {
                    console.log(error);
                    setSubmitting(false);
                    handleClose();
                }
            );
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>Add Task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Add and assign a task</DialogContentText>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    autoComplete="title"
                                    type="text"
                                    label="Title"
                                    {...getFieldProps('title')}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="description"
                                    type="text"
                                    label="Description"
                                    {...getFieldProps('description')}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="dueDate"
                                    type="date"
                                    label="Due Date"
                                    InputLabelProps={{ shrink: true }}
                                    {...getFieldProps('dueDate')}
                                    error={Boolean(touched.dueDate && errors.dueDate)}
                                    helperText={touched.dueDate && errors.dueDate}
                                />

                                <FormControl fullWidth error={Boolean(touched.assignedUser && errors.assignedUser)}>
                                    <InputLabel id="userId">Assigned User</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="name"
                                        label="Assigned User"
                                        {...getFieldProps('assignedUser')}
                                        error={Boolean(touched.assignedUser && errors.assignedUser)}
                                    >
                                        {users.map((user) => {
                                            const { id, name } = user;

                                            return (
                                                <MenuItem key={id} value={id}>
                                                    {name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>


                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Add Task
                                </LoadingButton>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Form>
                </FormikProvider>
            </Dialog>
        </div>
    );
}
