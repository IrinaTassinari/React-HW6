import { useEffect, useState } from "react"
import style from './UserProfile.module.css'
import axios from "axios"

function UserProfile(){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async() => {
        try { 
            setLoading(true) // бесконечный вызов - рендеринг
            const response = await axios.get('https://randomuser.me/api')
            console.log(response.data.results[0])
            setUser(response.data.results[0])
        }
        catch(error){
            console.error('Here is some error:', error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=> {fetchUser()},[])

    if(loading){
        return <h2>Loading...</h2>
    }
    

    return(
        <div className={style.user_card}>
            <img className={style.avatar} src={user.picture.large} alt="avatar" />
            <h2>{user.name.title} {user.name.first} {user.name.last}</h2>
            <p>{user.email}</p>
            <p>Country:{user.location.country} City:{user.location.city}</p>

            <button onClick={fetchUser} className={style.change_btn}>Swipe</button>  
            {/* не ставим () чтобы не вызвать ф-ю сразу */}
        </div>
    )
}
export default UserProfile