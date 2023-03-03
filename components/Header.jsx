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
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className={ router.pathname === '/' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700' }
                  aria-current="page"
                >
                  Oferta
                </Link>
              </li>
              <li>
                <Link
                  href="/pedidos"
                  className={ router.pathname === '/pedidos' || router.pathname === '/pedidos/nuevo-pedido' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700' }
                >
                  Pedidos
                </Link>
              </li>

              <li>
                <Link
                  href="/clientes"
                  className={ router.pathname === '/clientes' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700' }

                >
                  Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/ingresos"
                  className={ router.pathname === '/ingresos' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700' }
                >
                  Ingresos
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Pre-Factura
                </a>
              </li>
              <li>
                <a
                  href="/cuenta"
                  className={ router.pathname === '/cuenta' ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700' }
                >
                  Cuenta
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
