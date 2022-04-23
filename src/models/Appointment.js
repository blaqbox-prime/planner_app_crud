import { v4 } from "uuid";
import { damien, kevin } from "./User";

class Appointment {
  id;
  title;
  author;
  date;

  constructor(id, author, title, date) {
    this.id = id;
    this.author = author;
    this.date = date;
    this.title = title;
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

  create() {
    fetch("https://planout-server.herokuapp.com/appointment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.id,
        author: this.author.id,
        title: this.title,
        date: this.date,
      }),
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  update() {
    fetch("https://planout-server.herokuapp.com/appointment/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.id,
        title: this.title,
        date: this.date,
      }),
    })
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => console.error(err));
  }


  delete() {
    fetch(`https://planout-server.herokuapp.com/appointment/delete/${this.id}`, {
      method: "DELETE",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }
}

export default Appointment;

// sample data

export const appointments = [
  new Appointment(
    v4(),
    kevin,
    "Contact bank regarding suspicious activity on debit card",
    new Date("8 Sep, 2021"),
  ),
  new Appointment(
    v4(),
    damien,
    "Push new workflows to github branch",
    new Date("23 Sep, 2021"),
  ),
  new Appointment(
    v4(),
    kevin,
    "Update user flows with uUX feedback from Session #245",
    new Date(),
  ),
  new Appointment(
    v4(),
    kevin,
    "Wireframe splash page for new sales funnel",
    new Date(),
      ),
  new Appointment(
    v4(),
    damien,
    "Contact bank regarding suspicious activity on credit card",
    new Date("12 Dec, 2021"),
  ),
];
