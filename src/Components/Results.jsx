import React, { useEffect, useState, useCallback } from "react";
import styles from "../Styles/Results.module.css";
import { useHistory } from "react-router-dom";

import Button from "../UI/Button";
import Loader from "../UI/Loader";
import { TableHeadings, TableBodyRow } from "../UI/Table";

export default function Results() {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	const headings = ["Student Name", "Roll Number", "Total Marks", "Status"];

	const modifyResults = useCallback((data) => {
		const results = { ...data };
		let resData = [];
		// Minify data & calculate Total
		Object.keys(results).map((key) => {
			const result = { ...results[key] };
			let status = "Pass";
			resData.push({
				name: result.name[0].toUpperCase() + result.name.slice(1),
				rollNumber: result.rollNumber,
				total: Object.values(result.marks)
					.map((mark) => {
						if (mark < 20) status = "Fail";
						return mark;
					})
					.reduce((a, b) => a + b, 0),
				status: status,
			});
			return "";
		});
		// Sort as per name
		resData.sort((a, b) => (a.name > b.name ? 1 : -1));
		// Check highest mark and set Topper
		let highest = Math.max(...resData.map((d) => d.total));
		resData.map((res) => {
			if (res.total === highest) res.status = "Topper";
			return "";
		});
		setResults(resData);
	}, []);

	useEffect(() => {
		(async () => {
			await fetch("/marks.json")
				.then((res) => res.json())
				.then((data) => modifyResults(data))
				.catch(() => alert("Error"));
			setLoading(false);
		})();
	}, [modifyResults]);

	return (
		<div className={styles.wrapper}>
			<Button onClick={() => history.goBack()} title='Go Back' />
			<div className={styles.table}>
				<h3>Students Result Board</h3>
				<TableHeadings headings={headings} />
				{!loading && (
					<div className={styles.data}>
						{results.map((result, index) => (
							<TableBodyRow key={index} result={result} />
						))}
					</div>
				)}
			</div>
			{loading && <Loader />}
		</div>
	);
}
