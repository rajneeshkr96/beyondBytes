import { auth } from "@/backend/auth/auth"

const SetingPage = async() => {
    const session = await auth()
  return (
    <div>
        {JSON.stringify(session)
        }
    </div>
  )
}

export default SetingPage