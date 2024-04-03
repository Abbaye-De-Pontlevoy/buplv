import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";

import "./styles.css";

const ContactPage = () => {
  const randomName = "John Doe";
  const randomEmail = "johndoe@example.com";
  const randomMessage = "This is a random message.";

  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/contact" />

      <div className="bandeau-rangement">
        <div className="mainContainer">
          <h1>Page de contact</h1>
          <p>Name: {randomName}</p>
          <p>Email: {randomEmail}</p>
          <p>Message: {randomMessage}</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
