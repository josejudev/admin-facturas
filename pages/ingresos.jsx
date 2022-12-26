import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'


const aboutus = () => {
  return (
    <>
      <Layout
        title='Ingresos'
        description='This is the Ingresos page'
      >
        <h1 className='text-5xl my-5 font-semibold text-indigo-500'>
          Ingresos
        </h1> 
      </Layout>
    </>
    
  )
}

export default aboutus