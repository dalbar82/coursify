'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";

export default function CoursesPage () {
  const {user} = useAuth()
  const router = useRouter();

   useEffect(() => {
    console.log("user courses",  user);
    
    if (!user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, router]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        Courses
      </div>
    </>
  )
}