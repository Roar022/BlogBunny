import React from 'react'
export function loader({ request }:{request:Request}) {
    const pathname = new URL(request.url).searchParams.get("message") || null;
    if (pathname) {
      console.log("logged out");
    }
    return request;
}
const Landing = () => {
  return (
    <div>Landing</div>
  )
}
export default Landing