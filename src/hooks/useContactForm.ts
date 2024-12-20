import { useState } from "react";

export const useContactForm = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormExiting, setContactFormExiting] = useState(false);

  const handleContactClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setShowContactForm(true);
  };

  const handleCloseContact = () => {
    setContactFormExiting(true);
    setTimeout(() => {
      setShowContactForm(false);
      setContactFormExiting(false);
    }, 500);
  };

  return {
    showContactForm,
    contactFormExiting,
    handleContactClick,
    handleCloseContact,
  };
};
