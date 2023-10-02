import React from 'react';
import './home.css'

function Hero() {
  return (
    <section className="hero">
      <h1>Meetings with ease</h1>
      <p>
        Meet My Lecturer is your personalized gateway to educational
        excellence. Connect with experienced educators, discover their
        expertise. Get ready to elevate your knowledge!
      </p>
      <span>Login with Google</span>
      <button className="login_btn">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEwNDRfNzk3KSI+CjxwYXRoIGQ9Ik0yOS42ODEyIDE1LjMzNzVDMjkuNjgxMiAxNC4zNSAyOS41OTM3IDEzLjQxMjUgMjkuNDQzNyAxMi41SDE1LjMxODdWMTguMTM3NUgyMy40MDYyQzIzLjA0MzcgMTkuOTg3NSAyMS45ODEyIDIxLjU1IDIwLjQwNjIgMjIuNjEyNVYyNi4zNjI1SDI1LjIzMTJDMjguMDU2MiAyMy43NSAyOS42ODEyIDE5LjkgMjkuNjgxMiAxNS4zMzc1WiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTUuMzE4NyAyOS45OTk4QzE5LjM2ODcgMjkuOTk5OCAyMi43NTYyIDI4LjY0OTggMjUuMjMxMiAyNi4zNjIzTDIwLjQwNjIgMjIuNjEyM0MxOS4wNTYyIDIzLjUxMjMgMTcuMzQzNyAyNC4wNjIzIDE1LjMxODcgMjQuMDYyM0MxMS40MDYyIDI0LjA2MjMgOC4wOTM2NiAyMS40MjQ4IDYuOTA2MTYgMTcuODYyM0gxLjkzMTE1VjIxLjcyNDhDNC4zOTM2NSAyNi42MjQ4IDkuNDU2MTUgMjkuOTk5OCAxNS4zMTg3IDI5Ljk5OThaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik02LjkwNjEgMTcuODYyOUM2LjU5MzYgMTYuOTYyOSA2LjQzMTEgMTYuMDAwNCA2LjQzMTEgMTUuMDAwNEM2LjQzMTEgMTQuMDAwNCA2LjYwNjEgMTMuMDM3OSA2LjkwNjEgMTIuMTM3OVY4LjI3NTM5SDEuOTMxMUMwLjkwNjEwMiAxMC4zMDA0IDAuMzE4NjA0IDEyLjU3NTQgMC4zMTg2MDQgMTUuMDAwNEMwLjMxODYwNCAxNy40MjU0IDAuOTA2MTAyIDE5LjcwMDQgMS45MzExIDIxLjcyNTRMNi45MDYxIDE3Ljg2MjlaIiBmaWxsPSIjRkJCQzA1Ii8+CjxwYXRoIGQ9Ik0xNS4zMTg3IDUuOTM3NUMxNy41MzEyIDUuOTM3NSAxOS41MDYyIDYuNyAyMS4wNjg3IDguMTg3NUwyNS4zNDM3IDMuOTEyNUMyMi43NTYyIDEuNDg3NSAxOS4zNjg3IDAgMTUuMzE4NyAwQzkuNDU2MTUgMCA0LjM5MzY1IDMuMzc1IDEuOTMxMTUgOC4yNzVMNi45MDYxNSAxMi4xMzc1QzguMDkzNjUgOC41NzUgMTEuNDA2MiA1LjkzNzUgMTUuMzE4NyA1LjkzNzVaIiBmaWxsPSIjRUE0MzM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTA0NF83OTciPgo8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
          alt="Google"
        />
        <a href="/login">FPT.EDU.VN</a>
      </button>
    </section>
  )
}

export default Hero