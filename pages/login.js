import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {

  const router = useRouter();
  const [credentials, setCredentials] = useState({
    user_email: "",
    user_pass: "",
  });

  const handleChangeInput = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/auth/login", credentials);
      console.log(data);
      router.push("/");
    } catch (error) {
      toast.error("Error al iniciar sesión, por favor verifique sus credenciales",);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-gradient-to-r from-orange-100 to-teal-100 h-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
              <Image
                src="/horizontal_logo.png"
                alt="Vercel Logo"
                width={250}
                height={154}
                className="w-180 h-110 text-red-400 mr-2"
                priority
              />
   
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Iniciar sesión
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="user_email"
                    onChange={handleChangeInput}
                    id="email"
                    className="transition duration-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    onChange={handleChangeInput}
                    name="user_pass"
                    id="password"
                    placeholder="••••••••"
                    className="transition duration-300  focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Recordame
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default login;
