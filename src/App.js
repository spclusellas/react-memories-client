// Libraries
import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Row, Grid, Grow} from '@material-ui/core'
import { useDispatch } from 'react-redux'
// Components
import Posts from "./components/Posts/Posts"
import PostForm from "./components/PostForm/PostForm"
// Actions
import { getPosts } from './actions/posts'
// Resources
import memoriesLogo from './images/memories.png'
import useStyles from './styles'

const App = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <div>
            <Container  maxWidth='lg'>
                <AppBar className={classes.appBar} position='static' color="inherit">
                    <Typography className={classes.heading}  variant="h2" align="center">Memories</Typography>
                    <img className={classes.image} src={memoriesLogo} alt="memoriesLogo" height="60" />
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <PostForm  currentId={currentId} setCurrentId={setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </div>
    )
}



export default App
