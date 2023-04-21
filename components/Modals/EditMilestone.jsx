import {
  handleModalOrderEdit,
  useDispatch,
  useEffect,
  useState,
  axios,
  fetchMilestoneById,
} from '../../exports/commonExports'


const EditOffer = ({
  orderId,
}) => {
  const dispatch = useDispatch();

  const [editMilestone, setEditMilestone] = useState([])

  useEffect(() => {
    const getMilestone = async () => {
      const { data } = await axios.get(
        `/api/orders/${orderId}`
      );
      setEditMilestone(data);
    };
    getMilestone();
  }, [orderId])







  return (
    <div className="w-[900px] flex flex-col">

      <div className="grid grid-cols-2 pt-6">

        <h1 className="text-4xl font-bold text-teal-500">Editar Hitos</h1>
        <div className="flex justify-end">
          <button
            onClick={
              () => {
                dispatch(
                  handleModalOrderEdit()
                );
              }
            }
            type="button"
            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <form>
        <div className="rounded pb-8 mb-4 flex flex-col my-2">
        <table className="table p-4 mt-10 bg-white rounded-lg shadow table-auto w-full">
                <thead>
                  <tr>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Concepto
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Porcentage
                    </th>
                    <th className="border-b-2 p-4 whitespace-nowrap font-bold text-gray-900">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {editMilestone.map((milestone) => (
                    <tr key={milestone.id} className="text-gray-700hover:bg-gray-50 hover:transition-all">

                      <td className="border-b-2 p-4">{milestone.concept_milestone}</td>
                      <td className="border-b-2 p-4">{milestone.percentage_milestone}%</td>
                      <td className="border-b-2 p-4">${milestone.value_milestone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

          <div className=" md:flex mt-3 justify-end ">
            <div className="md:1/2 px-3 mt-3 md:mb-0 flex flex-row items-center justify-center gap-5">
              <button className="shadow-md shadow-teal-500/10 border border-teal-500 text-teal-500 hover:bg-teal-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
                Guardar
              </button>
              <button
                onClick={() => {
                  dispatch(handleModalOrderEdit())
                }}
                className="shadow-md shadow-red-500/10 border border-red-500 text-red-500  hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-16 py-2.5 mb-3 text-center inline-flex items-center w-1/2 justify-center">
                Cancelar
              </button>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditOffer;
