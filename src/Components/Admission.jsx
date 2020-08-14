import React, { useState } from "react";
import styles from "../Styles/Admission.module.css";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";
import Loader from "../UI/Loader";

export default function Admission() {
	const [fName, setFName] = useState(""); // A-Z, a-z
	const [lName, setLName] = useState(""); // A-Z, a-z
	const [clss, setClass] = useState(""); // A-Z, a-z, 0-9
	const [year, setYear] = useState(""); // 1990 - 2017
	const [percentage, setPercentage] = useState(""); // 0-100
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handlers = {
		firstName: ({ target: { value } }) => {
			if (value.match(/^[A-Za-z]+$/)) setFName(value);
		},
		lastName: ({ target: { value } }) => {
			if (value.match(/^[A-Za-z]+$/)) setLName(value);
		},
		class: ({ target: { value } }) => {
			if (value.match(/^[0-9a-zA-Z]+$/)) setClass(value);
		},
		year: ({ target: { value } }) => {
			setYear(value);
		},
		percentage: ({ target: { value } }) => {
			setPercentage(value);
		},
		submit: async (e) => {
			if (fName && lName && clss && year && percentage) {
				e.preventDefault();
				setLoading(true);
				await fetch("/admissions.json", {
					method: "POST",
					body: JSON.stringify({ firstName: fName, lastName: lName, class: clss, year, percentage }),
				})
					.then((res) => res.json())
					.then(() => alert("Submitted"))
					.catch(() => alert("Error"));
				setLoading(false);
			}
		},
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topBar}>
				<Button onClick={() => history.goBack()} title='Go Back' />
			</div>
			<h2>New Admission</h2>
			<form className={styles.form} id='form'>
				<label htmlFor='fname'>First Name</label>
				<input type='text' id='fname' value={fName} onChange={handlers.firstName} max={20} required />
				<span className={styles.tooltip}>Only Characters (A-Z, a-z)</span>
				<label htmlFor='lname'>Last Name</label>
				<input type='text' id='lname' value={lName} onChange={handlers.lastName} max={20} required />
				<span className={styles.tooltip}>Only Characters (A-Z, a-z)</span>
				<label htmlFor='class'>Class</label>
				<input type='text' id='class' value={clss} onChange={handlers.class} required />
				<span className={styles.tooltip}>Alphanumeric (A-Z, a-z, 0-9)</span>
				<label htmlFor='year'>Year</label>
				<input type='number' id='year' value={year} onChange={handlers.year} placeholder='YYYY' min='1990' max={2017} required />
				<span className={styles.tooltip}>Between 1990 & 2017</span>
				<label htmlFor='percentage'>Percentage (%)</label>
				<input type='number' id='percentage' value={percentage} min={0} max={100} onChange={handlers.percentage} required />
				<span className={styles.tooltip}>Between 0 & 100</span>
				{/* Form will not be submitted till all onditions are satisfied */}
				<Button form='form' type='submit' style={{ marginTop: "10px", width: "100%" }} onClick={handlers.submit} title='Submit' />
				{loading && <Loader />}
			</form>
		</div>
	);
}
