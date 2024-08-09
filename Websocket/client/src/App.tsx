import { useEffect, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, SetlatestMessage] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("recieved message:", message.data);
      SetlatestMessage(message.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return <div> connecting to socket server....Loading...</div>;
  }
  return (
    <div>
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        send
      </button>
      {latestMessage}
    </div>
  );
};

export default App;
