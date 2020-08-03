import React, { useState } from "react";
import styles from "./Faq.module.css";
import FaqCard from "../../Components/FaqCard/FaqCard";

const Faq = () => {
  const [faqs] = useState([
    {
      id: 0,
      question: "What is Central Funds Portal?",
      answer:
        "It is one stop solution to the tracking of funds and communication between the authorities of various departments.",
    },
    {
      id: 1,
      question: "How to Sign In?",
      answer:
        "Go to Home Page, click visit portal and enter valid credentials and then click Submit to get directed to the dashboard.",
    },
    {
      id: 2,
      question: "How to change user credentials?",
      answer: "Contact the admin of your respective department.",
    },
    {
      id: 3,
      question: "How to add Scheme?",
      answer:
        "User should be admin or moderator to add scheme, then through the Schemes tab on dashboard, click on create scheme and fill the required information.",
    },
    {
      id: 4,
      question: "How to view previous transactions?",
      answer:
        "Go to the Disbursal Status Tab on dashboard and scroll down to view all the previous transactions under the previous funds.",
    },
    {
      id: 5,
      question: "How to view current disbursal status?",
      answer:
        "Go to the Disbursal Status tab on dashboard and view current status of on-going transactions above previous funds.",
    },
    {
      id: 6,
      question: "How to raise a concern?",
      answer: "On the disbursal status of on-going transactions, click on Raise Issue button.",
    },
    {
      id: 7,
      question: "How to communicate with concerned people of respective schemes or departments?",
      answer:
        "Go to Conversation tab on dashboard, select scheme to enter the room to communicate with the concerned people.",
    },
    {
      id: 8,
      question: "How to access transactions of different schemes under my supervision?",
      answer:
        "Go to the Disbursal Status tab on the dashboard, view all the current and previous transactions under your supervision.To view transactions of a specific scheme, choose the scheme from the top right dropdown menu.",
    },
    {
      id: 9,
      question: "How to update status of transaction?",
      answer:
        "Go to the Disbursal Status tab on the dashboard, click on the received button of the respective transaction to update its status.",
    },
    {
      id: 10,
      question: "Why is update status not available?",
      answer:
        "This may be because the transactions have not been proved from previous authorities or you have already approved it.",
    },
    {
      id: 11,
      question: "Where to view the latest and previous updates and reminders?",
      answer:
        "On the dashboard, click on the bell icon on top right to view the updates and reminders.",
    },
    {
      id: 12,
      question: "What are rooms? How can I create one?",
      answer:
        "Rooms are channels to communicate with concerned entities . Go to the Conversation tab on the dashboard and click on the Create Room button to create one.",
    },
    {
      id: 13,
      question: "Can I modify my notification preferences?",
      answer:
        "On the dashboard, click on the profile button on top right on go to Account Settings to modify the preferences.",
    },
    {
      id: 14,
      question: "How to upload an attachment in Conservation?",
      answer:
        "Go to the Conversation tab on the dashboard, and click on Attach attachment button to add files from our computer.",
    },
  ]);

  const [openId, setOpenId] = useState();

  return (
    <div className={styles.faqPage}>
      <div className={styles.header}>
        <h1 className={styles.head}>FAQ</h1>
      </div>
      <div className={styles.questions}>
        {faqs.map((q) => {
          return (
            <FaqCard
              key={q.id}
              id={q.id}
              question={q.question}
              answer={q.answer}
              setOpenId={setOpenId}
              openId={openId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
