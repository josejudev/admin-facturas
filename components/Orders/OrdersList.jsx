import React from "react";

const OrdersList = ({ orders }) => {
  return (
    <>
      {orders.map((order) => (
        <tr key={order.id}>
          <td className="border-b-2 p-4 dark:border-dark-5">
            <input
              id="default-checkbox"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
            />
          </td>
          <td className="border-b-2 p-4">{order.date}</td>
          <td className="border-b-2 p-4">{order.name}</td>
          <td className="border-b-2 p-4">
            {order.currency === "US" ? "$" + order.amount : "€" + order.amount}
          </td>
          <td className="border-b-2 p-4">{order.final_amount}</td>
          <td className="border-b-2 p-4">{order.type}</td>
          <td className="border-b-2 p-4">{order.class_type}</td>
          <td className="border-b-2 p-4">{order.milestone}</td>
          <td className="border-b-2 p-4">
            <a
              href={`/uploads/${order.offer.fileName}`}
              alt="alt text"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 "
            >
              {order.offer.project_name}
            </a>
          </td>

          <td className="border-b-2 p-4">
            <a
              href={`/uploads/${order.fileName}`}
              alt="alt text"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 "
            >
              {order.fileName}
            </a>
          </td>

          <td className="border-b-2 p-4">
            {order.status === "Activo" ? (
              <span className="border border-green-200 text-green-500 font-medium  shadow-lg shadow-green-300/10 px-4 py-0.5 rounded">
                {order.status}
              </span>
            ) : order.status === "Cerrado" ? (
              <span className="border border-red-200 text-red-500 font-medium  shadow-lg shadow-red-300/10 px-4 py-0.5 rounded">
                {order.status}
              </span>
            ) : null}
          </td>
          <td className="border-b-2 p-4">
            {/*
            action button
             */}
            <div className="p-1">
              <div className="group relative">
                <button className="text-gray-500 px-6 h-10 rounded">
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
                </button>
                <nav
                  tabIndex="0"
                  className=" border-2 shadow-lg bg-white invisible border-gray-100 rounded w-[8rem] absolute left-2 bottom-1 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-10"
                >
                  <ul className="py-1">
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 hover:bg-gray-100 text-cyan-600 w-full"
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="block px-4 py-2 hover:bg-gray-100 text-red-600 w-full"
                      >
                        Eliminar
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrdersList;
