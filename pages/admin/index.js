import Layout from "../../components/Layout";

import InputFieldsOrder from "../../components/InputFieldsOrder";

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
  fetchUser,
} from "../../exports/commonExports";

import axios from "axios";
const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const logoutSession = async () => {
    const response = await axios.get("/api/auth/logout");
    router.push("/login");
  };

  useEffect(() => {
    // dispatch the fetchUser action creator on page load
    dispatch(fetchUser());
  }, [dispatch]);



  const user = useSelector((state) => state.users.data)

  const userName = user.user_name;
  const userEmail = user.user_email;



  const handleSubmitForm = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Profile" description="This is the profile page">
      <div className="px-2 sm:px-4 py-2.5">
        <div className=" flex flex-wrap items-center gap-4 mx-auto">
          <h1 className="text-5xl my-5 font-semibold text-gray-800">
            Administración de cuenta
          </h1>
        </div>
        <div className="">
          <div className=" mx-auto bg-white h-full p-5 rounded-lg m-5">
            <h2 className="text-lg my-5 font-semibold text-teal-500">
              Configuración de cuenta
            </h2>

            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="flex mx-auto mb-6 justify-center gap-5">

              <InputFieldsOrder
                label="Usuario"
                value={userName}
                name="username"
                register={register}
                errors={errors}
                onChange={handleChange}
                required
              />

              <InputFieldsOrder
                label="Correo"
                name="userEmail"
                value={userEmail}
                register={register}
                errors={errors}
                onChange={handleChange}
                required
              />
                </div>
            </form>
          </div>
          <div className=" mx-auto bg-white h-full p-5 rounded-lg">
            <h2 className="text-lg my-5 font-semibold text-teal-500">
              Administración de usuarios
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
