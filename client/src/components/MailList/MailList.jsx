import "./mailList.scss";

export default function MailList() {
  return (
    <div className="mail">
      <span className="mailTitle">Save time, save money</span>
      <span className="mailDesc">Signup now and recieve the best deal in the market</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
}
