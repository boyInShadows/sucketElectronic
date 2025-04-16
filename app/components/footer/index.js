import React from "react";
import ContactUs from "./contactUs";
import CommonQuestions from "./commonQuestions";
import FooterPart from "./footerPart";

const Footer = () => {
  return (
    <div className="w-full space-y-8 md:space-y-12">
      {/* Contact Us Section */}
      <section className="w-full">
        <ContactUs />
      </section>

      {/* Common Questions Section */}
      <section className="w-full">
        <CommonQuestions />
      </section>

      {/* Footer Part Section */}
      <section className="w-full">
        <FooterPart />
      </section>
    </div>
  );
};

export default Footer;
