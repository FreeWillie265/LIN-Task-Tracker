import * as React from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography
} from '@mui/material';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import moment from 'moment';

export default function ViewTaskModal({open, setOpen, task, reload}) {
    const handleClose = () => setOpen(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`task-comments/${task.id}`).then(
            (response) => {
                setComments(response.data);
            },
            (error) => console.log(error)
        )
    }, [reload]);

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
                                    <div>
                                        <span className="float-sm-start"><Typography><u><b>{comment.user.name}: </b></u></Typography></span>
                                        <span className="float-sm-end">{moment(comment.created_at).format('DD-MMM HH:mm')}</span>
                                    </div>
                                    <br/>
                                    <div>
                                        <Typography sx={{fontStyle: 'italic'}}>{comment.content}</Typography>
                                    </div>
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
