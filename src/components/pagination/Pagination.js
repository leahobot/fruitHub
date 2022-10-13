import React, {useState} from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
	currentPage,
	setCurrentPage,
	productPerPage,
	totalProducts,
}) => {
	const pageNumbers = [];
	const totalPages = totalProducts / productPerPage;

	//Limit page numbers shown
	const [pageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

	//Paginate
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	//Got to next Page
	const paginateNext = () => {
		setCurrentPage(currentPage + 1);

		//Show next set of page numbers
		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	//Go to prev page
	const paginatePrev = () => {
		setCurrentPage(currentPage - 1);

		//Show pre set of oage numbers
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className={styles.pagination}>
			<li
				onClick={paginatePrev}
				className={currentPage === pageNumbers[0] ? `${styles.hidden}` : null}>
				Previous
			</li>

			{pageNumbers.map((num) => {
				if (num < maxPageNumberLimit + 1 && num > minPageNumberLimit) {
					return (
						<li
							key={num}
							onClick={() => paginate(num)}
							className={currentPage === num ? `${styles.active}` : null}>
							{num}
						</li>
					);
				}
			})}

			<li
				onClick={paginateNext}
				className={
					currentPage === pageNumbers[pageNumbers.length - 1]
						? `${styles.hidden}`
						: null
				}>
				Next
			</li>
			<p>
				<b className={styles.page}>{`Page ${currentPage}`}</b>
				<span>{` of `}</span>
				<b>{` ${Math.ceil(totalPages)}`}</b>
			</p>
		</ul>
	);
};

export default Pagination;
