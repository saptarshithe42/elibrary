import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

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

            // add display name to user

            await res.user.updateProfile({displayName})

            // create a user document (to store online status, photoUrl and displayName,
            // because we plan to show all the members in a project in sidebar, with their
            // photos, usernames and online status)
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