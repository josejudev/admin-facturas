import React, { useState } from "react";

const ItemsPage = ({ perPage, setPerPage }) => {
  return (
    <select
      value={perPage}
      onChange={(e) => setPerPage(Number(e.target.value))}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-34"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">Todos</option>
    </select>
  );
};

const XlsxExport = ({ exportToExcel }) => {
  return (
    <button
      onClick={exportToExcel}
      className="shadow-lg shadow-green-500/10 hover:shadow-green-500/20 border border-green-300  bg-white p-2.5 bg flex justify-center items-center text-green-400 rounded-lg h-11"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </button>
  );
};

export { ItemsPage, XlsxExport };