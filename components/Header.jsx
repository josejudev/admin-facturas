import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  //Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logoutSession = async () => {
    const response = await axios.get('/api/auth/logout')
    router.push('/login')
  }

  return (
    <header>
      <nav className=" bg-white shadow-lg border-gray-200 rounded px-4 py-5  ">
        <div className=" flex flex-wrap items-center justify-between mx-auto p-1 ">
          <Link href="/" className="flex items-center">
            <img
              src="/horizontal_logo.png"
              width={190}
              height={154}
              className="w-180 h-110 text-red-400 mr-2"
              alt="Revolutio Logo"
            />
          </Link>
          <div class="md:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div class="absolute top-0 left-0 w-full">
                <div class="p-5 bg-white border rounded shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                  <Link href="/" className="flex items-center">
            <img
              src="/horizontal_logo.png"
              width={190}
              height={154}
              className="w-180 h-110 text-red-400 mr-2"
              alt="Revolutio Logo"
            />
          </Link>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    className="items-center justify-between w-full md:flex md:w-auto md:order-1"
                  >
                    <ul className="flex flex-col p-4 mt-4 border items-center border-gray-100 rounded-lg bg-gray-50 md:flex-row ">
                      <li>
                        <Link
                          href="/"
                          className={router.pathname === '/' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}
                          aria-current="page"
                        >
                          Ofertas
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pedidos"
                          className={router.pathname === '/pedidos' || router.pathname === '/pedidos/nuevo-pedido' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}
                        >
                          Pedidos
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/clientes"
                          className={router.pathname === '/clientes' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}

                        >
                          Clientes
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/ingresos"
                          className={router.pathname === '/ingresos' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}
                        >
                          Ingresos
                        </Link>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-teal-700"
                        >
                          Pre-Factura
                        </a>
                      </li>
                      <li>
                        <div className='items-center container justify-center flex'>
                          <div className="text-center relative inline-block">
                            <a
                              onClick={toggle}
                              className=
                              {
                                isOpen ? 'text-teal-700 border-b-2 border-teal-500 cursor-pointer' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out cursor-pointer'
                              }

                            >
                              Cuenta

                            </a>
                            {
                              isOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg border">
                                  <a href="#" className="hover:text-teal-700  hover:transition hover:ease-in-out  block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Admininistración de cuenta</a>
                                  <button type="submit" className="hover:text-teal-700   hover:transition hover:ease-in-out  block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem"
                                    onClick={logoutSession}
                                  >Cerrar Sesión</button>

                                </div>
                              )
                            }
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {
            /**
             * Mobile menu, show/hide based on menu state.
             */
          }

          <div
            className="items-center justify-between  w-full  md:w-auto md:order-1 hidden md:block"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white ">
              <li>
                <Link
                  href="/"
                  className={router.pathname === '/' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}
                  aria-current="page"
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/pedidos"
                  className={router.pathname === '/pedidos' || router.pathname === '/pedidos/nuevo-pedido' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}
                >
                  Pedidos
                </Link>
              </li>

              <li>
                <Link
                  href="/clientes"
                  className={router.pathname === '/clientes' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}

                >
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/ingresos"
                  className={router.pathname === '/ingresos' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out'}
                >
                  Ingresos
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-teal-700"
                >
                  Pre-Factura
                </a>
              </li>
              <li>
                <div className='items-center container justify-center flex'>
                  <div className="text-center relative inline-block">
                    <a
                      onClick={toggle}
                      className=
                      {
                        isOpen ? 'text-teal-700 border-b-2 border-teal-500 cursor-pointer' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out cursor-pointer'
                      }

                    >
                      Cuenta

                    </a>
                    {
                      isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg border">
                          <a href="#" className="hover:text-teal-700  hover:transition hover:ease-in-out  block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">Admininistración de cuenta</a>
                          <button type="submit" className="hover:text-teal-700   hover:transition hover:ease-in-out  block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem"
                            onClick={logoutSession}
                          >Cerrar Sesión</button>

                        </div>
                      )
                    }
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;
