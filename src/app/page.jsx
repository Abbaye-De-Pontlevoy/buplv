"use server"

import Nav from "./components/Nav";

export default async function Page() {
  // If connected, display a link to dashboard, else display a link to login
  return (
    <>
      <h1>HOME</h1>
      <Nav/>
      <a href="/qrcode">(temporaire) Scan QR Code</a>
    </>
  )
}
