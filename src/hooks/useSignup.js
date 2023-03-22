import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

import thumbnail from "./default_user_img.jfif"

export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {

        setError(null)
        setIsPending(true)

        try{
            // signup user
            const res =  await projectAuth.createUserWithEmailAndPassword(email, password)
            

            if(!res){
                throw new Error("Could not complete signup")
            }

            // default dp
            const imgUrl = "https://firebasestorage.googleapis.com/v0/b/elibrary-38a3f.appspot.com/o/thumbnails%2Fdefault_user_img.jfif?alt=media&token=3392b8a2-7420-4e39-9dbc-ead1dcb95f4c" 

            // add display name to user

            await res.user.updateProfile({displayName, photoURL : imgUrl})

            
            // each document is having the id same as uid instead of auto-generated firestore id

            // .doc(res.user.id) will create a new document if it isn't existing
            // .set({properties}) is used to set the data in the document
            await projectFirestore.collection("users").doc(res.user.uid).set({
                displayName,
                uploadedBooks : [],
                downloadedBooks : [],
                favourites : [] 
            })

            // dispatch login action
            dispatch({type : 'LOGIN', payload : res.user} )

            
            // update state

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }

        }
        catch(err){
            if(!isCancelled){
                console.log(err.message);
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect( () => {

        // cleanup function (runs when this component unmounts)
        return () => setIsCancelled(true) 

    } , [])

    
    return {error, isPending, signup}
}