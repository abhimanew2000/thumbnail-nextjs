import withAuth from "next-auth/middleware"
// these middleware restrict going to certain pages using url. 
export default withAuth({pages:{signIn:"/signin"}})

export const config =  { matcher:["/dashboard"] }