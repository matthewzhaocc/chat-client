import React, { useEffect, useState } from "react";
import useWebsocket from "react-use-websocket";
import { TextField, Button, Chip } from "@mui/material";

function App() {
  const [chat, setChat] = useState<string[]>([]);
  const [message, setMessage] = useState<string>();
  const { sendMessage, lastMessage } = useWebsocket("ws://localhost:3000");

  useEffect(() => {
    if (lastMessage !== null) {
      setChat((prev) => prev.concat(lastMessage.data as string));
    }
  }, [setChat, lastMessage]);
  return (
    <>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        value={message}
        onChange={(ev) => {
          setMessage(ev.target.value);
        }}
      />

      <Button
        onClick={() => {
          sendMessage(message || "");
          setMessage("");
        }}
      >
        Submit
      </Button>

      <br />
      <br />
      {chat.map((message) => (
        <Chip label={message} />
      ))}
    </>
  );
}

export default App;
