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

export default function AddCommentModal({open, setOpen, task}) {
    const handleClose = () => setOpen(false);

    const AddTaskSchema = Yup.object().shape({
        comment: Yup.string()
            .min(2, 'Too Short!')
            .max(500, 'Too Long!')
            .required('Comment content is Required')
    });

    const formik = useFormik({
        initialValues: {
            comment: '',
            task_id: task.id
        },
        validationSchema: AddTaskSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log(`Submitting ${JSON.stringify(values)}`);

            axios.post('/comments', values).then(
                (response) => {
                    console.log(response.data)
                    setSubmitting(false);
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
                                    autoComplete="comment"
                                    type="text"
                                    label="Comment"
                                    {...getFieldProps('comment')}
                                    error={Boolean(touched.comment && errors.comment)}
                                    helperText={touched.comment && errors.comment}
                                />

                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Add Comment
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
