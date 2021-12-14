import { v4 } from "uuid";
import { damien, kevin } from "./User";

class Message {
  uid = v4();
  message;
  sender;
  recipient;
  date;

  constructor(uid, message, sender, recipient,date) {
    this.uid = uid;
    this.message = message;
    this.sender = sender;
    this.recipient = recipient;
    this.date = date;
  }

  getFormattedDate() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (this.date !== null)
      return `${this.date.getDate()} ${
        months[this.date.getMonth()]
      }, ${this.date.getFullYear()}`;
  }

  send() {
    fetch("http://127.0.0.1:3002/message/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: this.uid,
        sender: this.sender.id,
        recipient: this.recipient,
        message: this.message,
        date: this.date,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }


  delete() {
    fetch(`http://127.0.0.1:3002/message/delete/${this.uid}`, {
      method: "DELETE",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }
}

export default Message;

// sample data