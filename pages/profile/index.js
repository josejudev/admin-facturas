import Layout from "../../components/Layout"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
const index = () => {
    const router = useRouter()

    const [user, setUser] = useState({
        user_email: "",
    })

    
    const getProfile = async () => {
        const res = await axios.get('/api/auth/profile')
        setUser(res.data)

    }

    const logoutSession = async () => {
        const response = await axios.get('/api/auth/logout')
        router.push('/login')
        console.log(response)
    }


  return (

    <Layout title="Profile" description="This is the profile page">
        <div className="container text-center mt-10 flex gap-5 justify-center items-center">
        <h1 className="text-3xl">Profile</h1>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => getProfile()}
        >
            Get data
        </button>
        <button
            onClick={() => logoutSession()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Log out
        </button>
        <pre>
            {JSON.stringify(user, null, 2)}
        </pre>
        </div>
    </Layout>

  )
}

export default index
