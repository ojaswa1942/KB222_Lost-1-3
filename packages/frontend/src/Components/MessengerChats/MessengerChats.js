/* eslint-disable */
import React, { useState, useEffect } from "react";
import styles from "./MessengerChats.module.css";
import { ReactComponent as AttachIcon } from "../../assets/icons/icons8-attach.svg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/icons8-download.svg";
import { ReactComponent as SendIcon } from "../../assets/icons/icons8_email_send.svg";
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
		files: [{ name: "Big file 12.txt", key: "1" }, { name: "Small.pdf", key: "2" }], 
		isNotification: false,
		user: { name: "Lal Chopra" },
		createdAt: randomTime(),
	},
];


const MessageCard = ({ message, handleDownload }) => {
	if(message.isNotification){
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
				message.files && (message.files.length > 0) && 
				<div className={styles.messageFileContainer} >
					{message.files.map((file, i) => {
						return (
							<div key={i} className={styles.messageFile}>
								<AttachIcon />
								<span className={styles.fileName}>{file.name}</span>
								<DownloadIcon className={styles.downloadIcon} onClick={() => handleDownload(file.key)} />
							</div>
						);
					})}
				</div>
			}
		</div>
	);
}

const MessageInput = ({ handleMessageSubmit, onBack }) => {
	const [message, updateMessage] = useState("");
	const [files, updateFiles] = useState([]);

	const submitForm = (e) => {
		e.preventDefault();
		handleMessageSubmit({ newMessage: message, files });
		updateMessage("");
		updateFiles([]);
	}

	return(
		<form className={styles.messageInputContainer} onSubmit={submitForm} >
			<div className={styles.goBack} onClick={onBack}>{`<<`}</div>
			
			<label htmlFor="uploadFiles">
				<AttachIcon className={styles.fileInputIcon} />
			</label>
			<input 
				id="uploadFiles"
				className={styles.fileInput}
				type="file" 
				multiple={true}
				onChange={e => updateFiles(e.target.files)}
			/>
			<input 
				required 
				type="text"
				value={message}
				placeholder="Type a Message" 
				className={styles.msgInput} 
				onChange={(e) => updateMessage(e.target.value)} 
			/>
			<label htmlFor="sendMessage">
				<SendIcon className={styles.sendIcon} />
			</label>
			<button 
				id="sendMessage"
				className={styles.sendButton}
				type="submit" 
			/>
		</form>
	);
}

const MessengerChats = ({ listReference, chatReference, selectedRoomId, messages = dummyMessages }) => {
	const [messagesToShow, updateMessages] = useState(dummyMessages);

	useEffect(() => {
		updateMessages([...messages, ...dummyMessages]);
	}, [messages])

	const handleDownload = (key) => {
		alert(`Downloaded file ${key}`);
	}

	const handleMessageSubmit = ({ newMessage, files }) => {
		console.log(newMessage, files);
	} 

	const gotoChat = () => {
		if(listReference.current) {
			listReference.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
		}
	}

  return (
    <div className={styles.messengerChats} ref={chatReference} >
			<MessageInput handleMessageSubmit={handleMessageSubmit} onBack={gotoChat} />
      
      <div className={styles.messageList} >
				{messagesToShow.map((message, i) => {
					return (
						<MessageCard key={i} message={message} handleDownload={handleDownload} />
					);
				})}
			</div>
    </div>
  );
};

export default MessengerChats;
