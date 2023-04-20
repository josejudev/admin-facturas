import Layout from "../../../components/Layout";
import {
  fetchOffers,
  useSelector,
  useState,
  useEffect,
  useDispatch,
  addOrder,
  useRouter,
  toast,
  useForm,
} from "../../../exports/commonExports";
import InputFieldsOrder from "../../../components/InputFieldsOrder";

const NuevoPedido = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const { data:ofertas } = useSelector((state) => state.offers);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const pendingOffers = ofertas.filter((offer) => offer.status === "Pendiente");

  const typeCurrency = [
    { id: 1, name: "USD" },
    { id: 2, name: "EUR" },
    { id: 3, name: "MXN" },
  ];

  const typeClass = [
    { id: 1, name: "ATYCOM" },
    { id: 2, name: "PROD AT" },
  ];

  const typeEntity = [
    { id: 1, name: "UNICO" },
    { id: 2, name: "RECURRENTE" },
  ];

  const typeStatus = [
    { id: 1, name: "Activo" },
    { id: 2, name: "Cerrado" },
  ];

  const entity = [
    { id: 1, name: "REVOLUTIO" },
    { id: 2, name: "ISOTROL" },
  ];

  const [order, setOrder] = useState({
    date: "",
    name: "",
    fileName: "",
    concept: "",
    type: typeEntity[0].name,
    class_type: typeClass[0].name,
    offer_id: "",
    //Money data
    amount: "",
    final_amount: "",
    currency: typeCurrency[0].name,
    order_balance: "",
    entity: entity[0].name,
  });

  const handleChange = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleFile = ({ target: { name, files } }) => {
    setOrder({
      ...order,
      [name]: files[0],
    });
  };

  //Create Milestone

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };

  const handleremove = (index) => {
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
  };

  const [inputFields, setInputFields] = useState([
    {
      milestone: "",
      percentage_milestone: "",
      value_milestone: "",
      concept_milestone: "",
    },
  ]);

  const sum = inputFields.reduce((total, obj) => {
    return total + Number(obj.percentage_milestone);
  }, 0);

  const handleAddClick = () => {
    setInputFields([
      ...inputFields,
      {
        milestone: inputFields.length,
        percentage_milestone: 0,
        value_milestone: 0,
        concept_milestone: "",
      },
    ]);
  };

  const calculateMilestoneValue = (finalAmount, percentage) => {
    const milestoneValue = (finalAmount * percentage) / 100;
    const roundedValue = milestoneValue.toFixed(2);
    return parseFloat(roundedValue);
  };

  const handleFinalAmountChange = (event) => {
    const finalAmount = event.target.value;
    setOrder({
      ...order,
      final_amount: finalAmount,
    });

    setInputFields(
      inputFields.map((field) => ({
        ...field,
        value_milestone: calculateMilestoneValue(
          finalAmount,
          field.percentage_milestone
        ),
      }))
    );
  };

  const handlePercentageChange = (event, index) => {
    const percentage = event.target.value;
    const list = [...inputFields];
    list[index].percentage_milestone = percentage;
    list[index].value_milestone = calculateMilestoneValue(
      order.final_amount,
      percentage
    );
    setInputFields(list);
  };

  const handleSubmitForm = async (data) => {
    try {
      dispatch(addOrder(data));
      router.push("/pedidos");
      setTimeout(() => {
        toast.success("Pedido agregado correctamente");
      }, 1000);
    } catch (error) {
      toast.error("Hubo un error al agregar el pedido" + error);
    }
  };

  return (
    <>
      <Layout title={"Nuevo Pedido"}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          encType="multipart/form-data"
        >
          {/*
        Primer container
         */}
          <div className="h-full w-ful pt-4 px-4">
            <h1 className=" mb-2 text-left text-4xl font-bold">
              Agregar nuevo pedido
            </h1>
            <div className="mx-auto max-w-full justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="md:flex-row  flex flex-wrap items-center justify-center mx-auto bg-white rounded-xl mt-5 gap-8">
                      <InputFieldsOrder
                        label="Fecha"
                        name="date"
                        type="date"
                        register={register}
                        errors={errors}
                        onChange={handleChange}
                        required
                      />
                      <InputFieldsOrder
                        label="Nombre del pedido"
                        name="name"
                        register={register}
                        errors={errors}
                        onChange={handleChange}
                        required
                      />
                      <InputFieldsOrder
                        label="Cantidad del pedido"
                        name="amount"
                        type="number"
                        register={register}
                        errors={errors}
                        onChange={handleChange}
                        required
                      />


                      <div className="-mx-3 md:flex mb-3">
                        <div className="md:w-full px-3 mb-6 md:mb-0">
                          <label className="block text-grey-darker text-sm font-bold mb-2 text-slate-700">
                              Divisa
                            <select
                            {...register("currency",{
                                required: true,
                            })}
                              onChange={handleChange}
                              className={
                                errors.currency ? "transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-red-200 border-red-300 appearance-none mt-1 px-3 py-2 border block w-64 rounded-md sm:text-sm " : "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1 "
                              }
                            >
                              {typeCurrency.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>

                      <InputFieldsOrder
                        label="Valor en pesos"
                        name="final_amount"
                        type="number"
                        register={register}
                        errors={errors}
                        onChange={handleChange}
                        required
                      />
                      <InputFieldsOrder
                        label="Saldo"
                        name="order_balance"
                        type="number"
                        register={register}
                        errors={errors}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/**
                 * Segundo contenedor
                 */}
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md ">
                  {inputFields.map((x, i) => {
                    return (
                      <div key={i}>
                        <div className=" flex justify-center items-center p-2 md:flex-row sm:flex-col">
                          <div className="">
                            <h1 className=" font-bold text-blue-500 text-center text-3xl">
                              Hito {i + 1}
                            </h1>
                          </div>
                          <div className="">
                            <label className="block px-3 text-grey-darkest md:ml-2">
                              <span className=" block text-sm font-medium text-slate-700">
                                Concepto
                              </span>
                              <input
                                type="text"
                                {
                                  ...register(`milestone[${i}].concept_milestone`, {
                                    required: true,
                                  })
                                }
                                onChange={(e) => handleinputchange(e, i)}
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                              />
                            </label>
                          </div>

                          <div className="">
                            <label className="block px-3 text-grey-darkest md:ml-2">
                              <span className=" block text-sm font-medium text-slate-700">
                                Porcentaje
                              </span>
                              <input
                                type="number"
                                {
                                  ...register(`milestone[${i}].percentage_milestone`, {
                                    required: true,
                                  })
                                }
                                value={x.percentage_milestone}
                                onChange={(event) =>
                                  handlePercentageChange(event, i)
                                }
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                              />
                            </label>
                          </div>

                          <div className="">
                            <label className="block px-3 text-grey-darkest md:ml-2">
                              <span className=" block text-sm font-medium text-slate-700">
                                Valor
                              </span>
                              <input
                                type="number"
                                {
                                  ...register(`milestone[${i}].value_milestone`, {
                                    required: true,
                                  })
                                }
                                value={x.value_milestone}
                                onChange={(event) =>
                                  handleinputchange(event, i)
                                }
                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                              />
                            </label>
                          </div>

                          <div className=" ">
                            {inputFields.length - 1 === i && sum < 100 && (
                              <div className="flex gap-3">
                                <button
                                  className="mx-auto mt-6  rounded-md border border-blue-500 p-2 w-full font-medium text-base text-blue-500 hover:bg-blue-400 hover:text-white items-center justify-center flex"
                                  onClick={handleAddClick}
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
                                      d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                  </svg>
                                  <span className="font-normal">Agregar</span>
                                </button>
                                {inputFields.length !== 1 && (
                                  <button
                                    className="mx-auto mt-6 rounded-md py-2 w-full font-medium text-md text-red-500 border border-red-500 hover:bg-red-600 hover:text-white items-center justify-center flex"
                                    onClick={() => handleremove(i)}
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
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                    <span className="font-normal">
                                      Eliminar
                                    </span>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex flex-col md:w-full text-center justify-center items-center">
                    {sum > 100 ? (
                      <p className="text-red-500 font-normal text-center">
                        Establecer porcentajes correctamente
                      </p>
                    ) : null}
                  </div>
                </div>
                {/**
                 * Tercer contenedor
                 */}
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className=" md:flex-row flex flex-wrap items-center justify-center mx-auto bg-white rounded-xl mt-5 gap-8">
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Oferta
                        </span>
                        <select
                        {
                          ...register("offer_id", {
                            required: true,
                          })
                        }
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"
                        >
                          {pendingOffers.map((offer) => (
                            <option key={offer.id} value={offer.id}>
                              {offer.project_name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <InputFieldsOrder
                        label="Concepto"
                        name="concept"
                        register={register}
                        onChange={handleChange}
                        errors={errors}
                        required
                        />

                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Clase
                        </span>
                        <select
                        {
                          ...register("class_type", {
                            required: true,
                          })
                        }
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"
                        >
                          {typeClass.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Tipo
                        </span>
                        <select
                          {
                            ...register("type", {
                              required: true,
                            })
                          }
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64"
                        >
                          {typeEntity.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className=" block text-sm font-medium text-slate-700">
                          Entidad
                        </span>
                        <select
                        {
                          ...register("entity", {
                            required: true,
                          })
                        }
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-64 "
                        >
                          {entity.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                {/*
                  Drag and drop
                  */}

                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-center">
                  <div className="w-1/2">
                    <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                      <span className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="font-medium text-gray-600">
                          Arrastre y suelte su archivo aquí o
                          <span className="text-blue-600 underline">
                            {" "}
                            seleccione
                          </span>
                        </span>
                      </span>
                      <input
                        type="file"
                        onChange={handleFile}
                        {
                          ...register("fileName", {
                            required: true,
                          })
                        }
                        accept="application/pdf"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/*
                  End of drag and drop
                  */}

              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Cantidad</p>
                  <p className="text-gray-700">
                    {order.currency === "MXN" && order.amount > 0
                      ? "$" + order.amount + " MXN"
                      : order.currency === "USD" && order.amount > 0
                      ? "$" + order.amount + " USD"
                      : order.currency === "EUR" && order.amount > 0
                      ? "€" + order.amount + " EUR"
                      : order.amount > 0
                      ? "$" + order.amount
                      : "$0.00"}
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Valor en pesos</p>
                  <p className="text-gray-700">
                    {order.final_amount > 0
                      ? "$" + order.final_amount + " MXN"
                      : "$0.00"}
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Saldo</p>
                  <p className="text-gray-700">
                    {order.order_balance > 0
                      ? "$" + order.order_balance + " MXN"
                      : "$0.00"}
                  </p>
                </div>

                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">
                      {order.final_amount > 0
                        ? "$" + order.final_amount + " MXN"
                        : "$0.00"}
                    </p>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-3.5 font-bold text-md text-blue-50 hover:bg-blue-600">
                  Guardar pedido
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default NuevoPedido;
