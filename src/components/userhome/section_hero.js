import React from 'react';
import './home.css'
import Carousel from 'react-bootstrap/Carousel';


var heroData = [
  {
    id: 1,
    image: require('../../assets/image/pexels-fauxels-3184317.jpg'),
    title: 'The perfect design for your website',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!',

  },
  {
    id: 2,
    image: require('../../assets/image/pexels-icsa-1708912.jpg'),
    title: 'Start Your Future Financial Plan',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!',

  },
  {
    id: 3,
    image: require('../../assets/image/pexels-icsa-1708988.jpg'),
    title: 'Enjoy the Difference',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!',

  }
]

const h1Style = {
  width: '90%',
}
const pStyle = {
  width: '90%',
}
const leftDivStyle = {
  padding: '0 50px',
  margin: 'auto 0',
}

const rightDivStyle = {
  padding: '32px',
  color: "#333",
  backgroundColor: 'rgb(248 249 250)',
}

function Hero() {
  return (
    <section className=" align-items-center justify-content-between hero">
      <div className='w-50 float-start' style={leftDivStyle}>
        <h1 className='text-start' style={h1Style}>Connecting Students and Teachers for Meetings</h1>
        <p className='m-0 text-start' style={pStyle}>
          {/* Meet My Lecturer is your personalized gateway to educational
          excellence. Connect with experienced educators, discover their
          expertise. Get ready to elevate your knowledge! */}
          Welcome to Meet My Lecturer, the platform that brings students and teachers together for convenient scheduling and produtive meetings.
        </p>
        <span className='d-block text-start'>Login with Google</span>
        <button className="login_btn ">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEwNDRfNzk3KSI+CjxwYXRoIGQ9Ik0yOS42ODEyIDE1LjMzNzVDMjkuNjgxMiAxNC4zNSAyOS41OTM3IDEzLjQxMjUgMjkuNDQzNyAxMi41SDE1LjMxODdWMTguMTM3NUgyMy40MDYyQzIzLjA0MzcgMTkuOTg3NSAyMS45ODEyIDIxLjU1IDIwLjQwNjIgMjIuNjEyNVYyNi4zNjI1SDI1LjIzMTJDMjguMDU2MiAyMy43NSAyOS42ODEyIDE5LjkgMjkuNjgxMiAxNS4zMzc1WiIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTUuMzE4NyAyOS45OTk4QzE5LjM2ODcgMjkuOTk5OCAyMi43NTYyIDI4LjY0OTggMjUuMjMxMiAyNi4zNjIzTDIwLjQwNjIgMjIuNjEyM0MxOS4wNTYyIDIzLjUxMjMgMTcuMzQzNyAyNC4wNjIzIDE1LjMxODcgMjQuMDYyM0MxMS40MDYyIDI0LjA2MjMgOC4wOTM2NiAyMS40MjQ4IDYuOTA2MTYgMTcuODYyM0gxLjkzMTE1VjIxLjcyNDhDNC4zOTM2NSAyNi42MjQ4IDkuNDU2MTUgMjkuOTk5OCAxNS4zMTg3IDI5Ljk5OThaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik02LjkwNjEgMTcuODYyOUM2LjU5MzYgMTYuOTYyOSA2LjQzMTEgMTYuMDAwNCA2LjQzMTEgMTUuMDAwNEM2LjQzMTEgMTQuMDAwNCA2LjYwNjEgMTMuMDM3OSA2LjkwNjEgMTIuMTM3OVY4LjI3NTM5SDEuOTMxMUMwLjkwNjEwMiAxMC4zMDA0IDAuMzE4NjA0IDEyLjU3NTQgMC4zMTg2MDQgMTUuMDAwNEMwLjMxODYwNCAxNy40MjU0IDAuOTA2MTAyIDE5LjcwMDQgMS45MzExIDIxLjcyNTRMNi45MDYxIDE3Ljg2MjlaIiBmaWxsPSIjRkJCQzA1Ii8+CjxwYXRoIGQ9Ik0xNS4zMTg3IDUuOTM3NUMxNy41MzEyIDUuOTM3NSAxOS41MDYyIDYuNyAyMS4wNjg3IDguMTg3NUwyNS4zNDM3IDMuOTEyNUMyMi43NTYyIDEuNDg3NSAxOS4zNjg3IDAgMTUuMzE4NyAwQzkuNDU2MTUgMCA0LjM5MzY1IDMuMzc1IDEuOTMxMTUgOC4yNzVMNi45MDYxNSAxMi4xMzc1QzguMDkzNjUgOC41NzUgMTEuNDA2MiA1LjkzNzUgMTUuMzE4NyA1LjkzNzVaIiBmaWxsPSIjRUE0MzM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTA0NF83OTciPgo8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
            alt="Google"
          />
          <a href="/login">FPT.EDU.VN</a>
        </button>
      </div>
      <Carousel className='w-50 float-end'>
        {
          heroData.map(hero => {
            return (
              <Carousel.Item key={hero.id}>
                <img
                  className="d-block w-100"
                  src={hero.image}
                  alt={"slide " + hero.id}
                />
                <div style={rightDivStyle}>
                  <h3 className='text-start'>{hero.title}</h3>
                  <p className=' text-start'>{hero.description}</p>
                </div>
              </Carousel.Item>
            );
          })
        }
      </Carousel>
    </section>
  )
}

export default Hero