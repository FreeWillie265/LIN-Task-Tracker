import * as React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import {Dialog, DialogActions, DialogContent, FormControl, InputLabel, Select, Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import moment from 'moment';

export default function EditTaskModal({task, open, setOpen}) {
    const handleClose = () => setOpen(false);

    const AddTaskSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Task Title is Required'),
        description: Yup.string(),
        dueDate: Yup.date().required('Due Date is Required'),
        assignedUser: Yup.string().required('Assign a user')
    });

    const formik = useFormik({
        initialValues: {
            title: task.title || '',
            description: task.description || '',
            dueDate: moment(task.dueDate).format('YYYY-MM-DD') || '',
            assignedUser: task.assignedUser || '',
            completionStatus: task.completionStatus || 0
        },
        validationSchema: AddTaskSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(`Submitting ${JSON.stringify(values)}`);
            setSubmitting(false);
            axios.put(`tasks/${task.id}`, values).then(
                (response) => {
                    console.log(`response: ${JSON.stringify(response.data)}`);
                },
                (errors) => console.log(errors)
            );
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{`Edit task ${task.title}`}</DialogContentText>
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

                                <FormControl fullWidth error={Boolean(touched.userId && errors.userId)}>
                                <InputLabel id="userId">Username</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="Username"
                                    label="Username"
                                    {...getFieldProps('userId')}
                                    error={Boolean(touched.userId && errors.userId)}
                                >
                                    {users.map((user) => {
                                        const { id, userName } = user;

                                        return (
                                            <MenuItem key={id} value={id}>
                                                {userName}
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
                                    Save Task
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
