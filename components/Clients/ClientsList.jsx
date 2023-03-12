import useAdmin from "../../hooks/useAdmin";


const ClientsList = ({ clients }) => {
  const { handleSetClient, handleModalDelete,handleModalEditClient } = useAdmin();

  return (
    <>
      {
        
      clients.map((client) => (
        <tr key={client.id} className="text-gray-700">
          <td className="border-b-2 p-4">{client.name}</td>
          <td className="border-b-2 p-4">{client.rfc}</td>
          <td className="border-b-2 p-4">{client.fiscal_address}</td>
          <td className="border-b-2 p-4">{client.address}</td>
          <td className="border-b-2 p-4">{client.email}</td>
          <td className="border-b-2 p-4">{client.contact_name}</td>
          <td className="border-b-2 p-4">{client.contact_phone}</td>
          <td className="border-b-2 p-4">{client.contact_email}</td>
          <td className="border-b-2 p-4">
          {client.status === "Activo" ? <span className="border border-green-200 text-green-500 font-medium  shadow-lg shadow-green-300/10 px-4 py-0.5 rounded">{client.status}</span> : <span className="border border-red-200 text-red-500 font-medium  shadow-lg shadow-red-300/10 px-4 py-0.5 rounded">{client.status}</span>  }


          </td>

          <td className="border-b-2 p-4">
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
                        onClick={() => {
                          handleModalEditClient();
                          handleSetClient(client);
                        }}
                        type="button"
                        className="block px-4 py-2 hover:bg-gray-100 text-cyan-600 w-full"
                      >
                        Editar
                      </button>
                    </li>
                    <li>
                    <button
                        onClick={() => {
                          handleModalDelete();
                          handleSetClient(client);
                        }}
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

export default ClientsList;
