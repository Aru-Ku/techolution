import React from "react";
import styles from "../Styles/UI.module.css";

export default function Home(props) {
	return (
		<button style={props.style} type={props.type || ""} form={props.form || ""} className={styles.button} onClick={props.onClick}>
			{props.title}
		</button>
	);
}
