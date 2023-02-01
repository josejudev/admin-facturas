import React from "react";

const Clientsi = ({ clients }) => {
  return (
    <>
      {clients?.map((client) => (
        <tr key={client.id} className="text-gray-700">
          <td className="border-b-2 p-4 dark:border-dark-5">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </td>
          <td className="border-b-2 p-4">{client.name}</td>
          <td className="border-b-2 p-4">{client.rfc}</td>
          <td className="border-b-2 p-4">{client.fiscal_address}</td>
          <td className="border-b-2 p-4">{client.address}</td>
          <td className="border-b-2 p-4">{client.email}</td>
          <td className="border-b-2 p-4">{client.contact_phone}</td>
          <td className="border-b-2 p-4">{client.contact_email}</td>

          <td className="border-b-2 p-4">
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 flex"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Clientsi;
