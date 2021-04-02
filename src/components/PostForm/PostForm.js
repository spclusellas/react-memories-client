import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const PostForm = ({ currentId, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem("profile"))
    const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
    // State from the component
    const [postData, setPostData] = useState({
        title: "",
        messege: "",
        tags: "",
        selectedFile: "",
    });

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const classes = useStyles();
    // Redux Hook that is used tod call an action that has been previously imported
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Disoatches action of createPost that was previously imported from the actions
        if (currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result.name}));
        } else {
            dispatch(createPost({...postData, name: user?.result.name}));
        }
        clear()
    };

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            messege: "",
            tags: "",
            selectedFile: "",
        });
    };

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center" >
                    Please Sign In
                </Typography>
            </Paper>
        )
    } else {
        return (
            <Paper className={classes.paper}>
                <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                    <Typography variant='h6'>{currentId ? "Editing" : "Creating"} a Memory</Typography>
                    <TextField
                        name='title'
                        variant='outlined'
                        label='Title'
                        fullWidth
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    />
                    <TextField
                        name='messege'
                        variant='outlined'
                        label='Messege'
                        fullWidth
                        value={postData.messege}
                        onChange={(e) => setPostData({ ...postData, messege: e.target.value })}
                    />
                    <TextField
                        name='tags'
                        variant='outlined'
                        label='Tags'
                        fullWidth
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                    />
                    <div className={classes.fileInput}>
                        <FileBase
                            type='file'
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <Button
                        variant='contained'
                        className={classes.buttonSubmit}
                        color='primary'
                        size='large'
                        type='submit'
                        fullWidth>
                        Submit
                    </Button>
                    <Button variant='contained' color='secondary' size='small' onClick={clear}>
                        Clear
                    </Button>
                </form>
            </Paper>
        );
    }
};

export default PostForm;
