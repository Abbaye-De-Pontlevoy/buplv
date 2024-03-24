import Link from "next/link";
import React from "react";
import { isUserConnected } from "../helpers/isUserConnected";

export default async function Nav(request) {

  return (
    <nav>
      <ul>
        {await isUserConnected() ? (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/register">Signup</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
