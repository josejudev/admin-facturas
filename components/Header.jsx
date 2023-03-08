import Link from "next/link"
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter()

  return (
    <header>
      <nav className="bg-white shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
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

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white ">
              <li>
                <Link
                  href="/"
                  className={ router.pathname === '/' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out' }
                  aria-current="page"
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/pedidos"
                  className={ router.pathname === '/pedidos' || router.pathname === '/pedidos/nuevo-pedido' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out' }
                >
                  Pedidos
                </Link>
              </li>

              <li>
                <Link
                  href="/clientes"
                  className={ router.pathname === '/clientes' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out' }

                >
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/ingresos"
                  className={ router.pathname === '/ingresos' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out' }
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
              <Link
                  href="/cuenta"
                  className={ router.pathname === '/cuenta' ? 'text-teal-700 border-b-2 border-teal-500' : 'text-gray-700 hover:text-teal-700  hover:border-b-2 hover:border-teal-500 hover:transition hover:ease-in-out' }
                >
                  Cuenta
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
