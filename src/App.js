import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [Id, setId] = useState("");

  const subscribers = async () => {
    const response = await fetch("https://cp-8esh.onrender.com/subscribers");
    const data = await response.json();

    const ele = document.getElementById("result");
    ele.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const pr = document.createElement("p");
      pr.innerText = `Name :${data[i].name}, Subscribed-Channel :${data[i].subscribedChannel}, Subscribed-Date : ${data[i].subscribedDate}`;
      ele.appendChild(pr);
    }
  };

  const subscribersByName = async () => {
    const response = await fetch(
      "https://cp-8esh.onrender.com/subscribers/names"
    );
    const data = await response.json();

    const ele = document.getElementById("result");
    ele.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const pr = document.createElement("p");
      pr.innerText = `Name :${data[i].name}, Subscribed-Channel :${data[i].subscribedChannel}`;
      ele.appendChild(pr);
    }
  };

  const subscriberById = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://cp-8esh.onrender.com/subscribers/${Id}`
    );
    const data = await response.json();

    const ele = document.getElementById("result");
    ele.innerHTML = "";
    const pr = document.createElement("p");
    if (data.name) {
      pr.innerText = `Name :${data.name}, Subscribed-Channel :${data.subscribedChannel}, Subscribed-Date:${data.subscribedDate}`;
    } else {
      pr.innerText = data.message;
    }
    ele.appendChild(pr);
  };
  return (
    <div className="container text-center">
      <h1 className="shadow mb-2 text-danger pb-1">You-Tube Subscribers</h1>

      <div className="d-flex justify-content-around mt-5">
        <button
          className="btn btn-info"
          id="subscribers"
          onClick={(e) => {
            subscribers();
          }}
        >
          Subscribers
        </button>

        <button
          className="btn btn-info"
          id="subscribersByName"
          onClick={(e) => {
            subscribersByName();
          }}
        >
          Subscribers-By-Name
        </button>
      </div>

      <div className="mt-3">
        <form onSubmit={(e) => subscriberById(e)}>
          <input
            type="text"
            className="form-control"
            value={Id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            name="subscriberId"
            placeholder="Enter User ID..."
          />
          <button type="submit" className="btn btn-info mt-2">
            Subscribers-By-Id
          </button>
        </form>
      </div>
      <div id="result" className="mt-2"></div>
    </div>
  );
};

export default App;
