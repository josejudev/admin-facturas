import Layout from "../../components/Layout"
import { useState } from "react"
import { useRouter } from "next/router"
import useAdmin from "../../hooks/useAdmin"
import axios from "axios"
const index = () => {
    const router = useRouter()
    const { user } = useAdmin()




    

    const logoutSession = async () => {
        const response = await axios.get('/api/auth/logout')
        router.push('/login')
        console.log(response)
    }


  return (

    <Layout title="Profile" description="This is the profile page">
        <div className="container text-center mt-10 flex gap-5 justify-center items-center">
        <h1 className="text-3xl">
            Welcome {user.user_name} {
                user.role_id === 1 
                    ?<span className="text-green-500">Admin</span>:<span className="text-blue-500">User</span>
            }
        </h1>
        <button
            onClick={() => logoutSession()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Log out
        </button>

        </div>
    </Layout>

  )
}

export default index
