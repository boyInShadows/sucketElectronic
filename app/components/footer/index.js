import React from "react";
import ContactUs from "./contactUs";
import CommenQuestions from "./commonQuestions";
import FooterPart from "./footerPart";

const footerComponent = () => {
  return (
    <div>
      <ContactUs />
      <CommenQuestions />
      <FooterPart />
    </div>
  );
};

export default footerComponent;
