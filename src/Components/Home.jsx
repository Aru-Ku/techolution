import React from "react";
import styles from "../Styles/Home.module.css";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";

export default function Home() {
	const history = useHistory();
	const handlers = {
		goToResults: () => {
			history.push("/results");
		},
		goToAdmissions: () => {
			history.push("/admissions");
		},
	};

	return (
		<div className={styles.wrapper}>
			<h1>Techolution Student Portal</h1>
			<div className={styles.buttonBox}>
				<Button onClick={handlers.goToResults} title='Results' />
				<Button onClick={handlers.goToAdmissions} title='Admissions' />
			</div>
		</div>
	);
}
