import * as React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import {Dialog, DialogActions, DialogContent, Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function AddTaskModal({open, setOpen}) {
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
            dueDate: ''
        },
        validationSchema: AddTaskSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(`Submitting ${values}`);
            setSubmitting(false);
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>Add User</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Add a user to the system</DialogContentText>
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


                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Add User
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
