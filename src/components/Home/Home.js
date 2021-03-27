import React, { useState, useEffect } from "react";
import { Container, Grid, Grow} from '@material-ui/core'
import { useDispatch } from 'react-redux'
// Components
import Posts from "../Posts/Posts"
import PostForm from "../PostForm/PostForm"
// Actions
import { getPosts } from '../../actions/posts'
// Resources
import useStyles from '../../styles'

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
                <Grid
                    container
                    className={classes.mainContainer}
                    justify='space-between'
                    alignItems='stretch'
                    spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <PostForm currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;