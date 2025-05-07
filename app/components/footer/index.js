import React from "react";
import ContactUs from "../main/contactUs";
import CommonQuestions from "../main/commonQuestions";
import FooterPart from "./footerPart";

const Footer = () => {
  return (
    <div className="w-full space-y-8 md:space-y-12">
      <section className="w-full">
        <FooterPart />
      </section>
    </div>
  );
};

export default Footer;
