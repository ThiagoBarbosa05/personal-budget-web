"use client"
import { SignOut } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"
import {deleteCookie} from 'cookies-next'
import { useRouter } from "next/navigation"



export  function Logout() {
  const router = useRouter()

  function handleLogoutUser() {
    deleteCookie('next_token')
    router.refresh()
  } 
  return (
    <Button onClick={handleLogoutUser} className="flex items-center gap-1">
      logout
      <SignOut size={16} />
    </Button>
  )
}
