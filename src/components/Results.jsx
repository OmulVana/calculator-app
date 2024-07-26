import React, { useState } from 'react';
import { formatter } from '../util/investment';

export default function Results({ results }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  if (results.length === 0) {
    return <p className="center">Invalid input data provided.</p>;
  }

  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="result">
      <div>
        <table id="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((yearData) => {
              const totalInterest =
                yearData.valueEndOfYear -
                yearData.annualInvestment * yearData.year -
                initialInvestment;
              const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

              return (
                <tr key={yearData.year}>
                  <td>{yearData.year}</td>
                  <td>{formatter.format(yearData.valueEndOfYear)}</td>
                  <td>{formatter.format(yearData.interest)}</td>
                  <td>{formatter.format(totalInterest)}</td>
                  <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={indexOfLastItem >= results.length}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
