import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [posts, setPosts] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {   //iska structuring me error aa sakta hai so just check with it for once
        if (slug) {
            appwriteService.getPost(slug).then((posts) => {
                if (posts) {
                    setPosts(posts)
                }
                else {
                    navigate('/')
                }
            })
        }
    },[slug, navigate])
    return posts ?(
        <div className='py-8'>
                <Container>
                    <PostForm post = {posts} />
                </Container>
        </div>
    ) : null
}

export default EditPost
