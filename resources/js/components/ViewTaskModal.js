import * as React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography
} from '@mui/material';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';

export default function ViewTaskModal({open, setOpen, task}) {
    const handleClose = () => setOpen(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`task-comments/${task.id}`).then(
            (response) => {
                setComments(response.data);
            },
            (error) => console.log(error)
        )
    }, []);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
            >
                <DialogTitle>
                    <p><b>{task.title}</b></p>
                    <hr/>
                    <p>{task.description}</p>
                </DialogTitle>
                <DialogContent>
                    <>
                        <b>Comments</b>
                        <br/>
                        <br/>
                        <br />
                        {comments.map((comment) => {

                            return (
                                <div key={comment.id}>
                                    <Typography><u><b>{comment.user.name}: </b></u></Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>{comment.content}</Typography>
                                    <hr />
                                </div>
                            );
                        })}

                    </>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
