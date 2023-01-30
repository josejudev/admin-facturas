import { format } from "date-fns";

const OffersList = ({ offers }) => {
  return (
    <>
      {offers?.map((offer) => (
        <tr key={offer.id} className="text-gray-700">
          <td className="border-b-2 p-4 dark:border-dark-5">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </td>
          <td className="border-b-2 p-4">{offer.date}</td>
          <td className="border-b-2 p-4">{offer.project_name}</td>
          <td className="border-b-2 p-4">{offer.client.name}</td>
          <td className="border-b-2 p-4">{offer.final_client}</td>
          <td className="border-b-2 p-4">{offer.activity_resumen}</td>
          <td className="border-b-2 p-4"><span class="border border-yellow-200 text-yellow-500 font-medium  shadow-lg shadow-yellow-300/25 px-4 py-0.5 rounded">{offer.status}</span></td>
          <td className="border-b-2 p-4">
            <a
              href={`/uploads/${offer.fileName}`}
              alt="alt text"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 "
            >
              {offer.fileName}
            </a>
          </td>

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

export default OffersList;
