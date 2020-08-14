import React from "react";
import styles from "../Styles/UI.module.css";

export function TableHeadings({ headings, className }) {
	return (
		<div className={styles.subheadings}>
			{headings.map((heading) => (
				<h4 key={heading}>{heading}</h4>
			))}
		</div>
	);
}

export function TableBodyRow({ result }) {
	return (
		<div
			className={styles.dataRow}
			style={
				result.status === "Fail" ? { color: "red" } : result.status === "Topper" ? { color: "#13b91a" } : { color: "black" }
			}>
			<p>{result.name}</p>
			<p>{result.rollNumber}</p>
			<p>{result.total}</p>
			<p>{result.status}</p>
		</div>
	);
}
