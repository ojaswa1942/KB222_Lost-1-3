import React, { useState, useEffect } from "react";
import styles from "./MessengerChats.module.css";
import { ReactComponent as AttachIcon } from "../../assets/icons/icons8-attach.svg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/icons8-download.svg";
import { randomTime, calculateDateTime } from "../../utils/utils";

let dummyMessages = [
	{ 
		id: 0, 
		body: "HAHA, PESA AA GYA", 
		files: [], 
		isNotification: false,
		user: { name: "Shyam Lal Mavi" },
		createdAt: randomTime(),
	},
	{ 
		id: 1, 
		body: "Mera Pesa Khn gya", 
		files: [], 
		isNotification: false,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
	{ 
		id: 2, 
		body: "Khaate se pesa chala gya", 
		files: [], 
		isNotification: true,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
		{ 
		id: 3, 
		body: "Mera Pesa Khn gya", 
		files: [], 
		isNotification: false,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
	{ 
		id: 4, 
		body: "Khaate se pesa chala gya", 
		files: [], 
		isNotification: false,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
	{ 
		id: 5, 
		body: "Khaate se pesa chala gya. I want to inform everyone that this time is very serious and all the best people", 
		files: [], 
		isNotification: false,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
	{ 
		id: 4, 
		body: "Khaate se pesa chala gya", 
		files: [], 
		isNotification: false,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
];


const MessageCard = ({ message }) => {
	const handleDownload = (key) => {
		alert(`Downloaded file ${key}`);
	}
	if(message.isNotification){
		console.log(message.body);
		return(
			<div className={styles.notifCard}>
				<div className={styles.messageBody}>{message.body}</div>
			</div>
		);
	} 

	return (
		<div className={styles.messageCard}>
			<div className={styles.messageSentInfo}>
				<span className={styles.senderName}>{message.user.name}</span>
				<span className={styles.sentTime}>{calculateDateTime(new Date(), new Date(message.createdAt))}</span>
			</div>
			<div className={styles.messageBody}>{message.body}</div>
			{
				message.files && message.files.length && 
				<div className={styles.messageFileContainer} >
					{message.files.map((file, i) => {
						return (
							<div key={i} className={styles.messageFile}>
								<AttachIcon />
								{file.name}
								<DownloadIcon onClick={() => handleDownload(file.key)} />
							</div>
						);
					})}
				</div>
			}
		</div>
	);
}
const MessengerChats = ({ selectedRoomId }) => {
	const [messages, updateMessages] = useState([]);
	useEffect(() => {
		updateMessages(dummyMessages);
	}, [selectedRoomId]);
  return (
    <div className={styles.messengerChats}>
      <div className={styles.messageList} >
				{messages.map((message, i) => {
					return (
						<MessageCard key={i} message={message} />
					);
				})}
			</div>
    </div>
  );
};

export default MessengerChats;
