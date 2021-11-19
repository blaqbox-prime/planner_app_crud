import React from 'react'
import Weather from './../components/Weather';


function Dashboard() {

    const _buildGreetingMessage = () => {
        const hour = new Date().getHours();
        console.log(hour);
        if(hour >= 12){
          return "Good Afternoon"
        }
        else
        if(hour >= 18){
          return "Good Evening"
        }
        else{
          return "Good Morning"
        }
      }

    return (
        <div className="Dashboard main-container">
        <div className="Dashboard__heading page_header">
        <h1 className="Dashboard__title page_title">{_buildGreetingMessage()} <span className="text-green">Kevin</span></h1>
        </div>
        <Weather/>
    </div>
    )
}

export default Dashboard
