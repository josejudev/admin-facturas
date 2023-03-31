import React from 'react'
import Select from 'react-select'




const DBSuppliers2 = [
  //cretate 1000 suppliers
  ...Array(100).fill().map((_, i) => ({
    id: i,
    name: `Supplier ${i}`,
    address: `Supplier ${i} address`,
  })),
]

const example = () => {

  const handleSelectChange = ( event ) => {
    console.log(event);
}
  return (
    <div>
              <div className = "  border border-dashed p-10 w-1/2 flex mx-auto ">
            <Select
            key = { DBSuppliers2.id }
            className = "  text-center w-1/2 mx-auto shadow-lg "
                // defaultValue = { suppliers[0] }
                options = { DBSuppliers2.map(sup => ({ label: sup.name, value: sup.id })) }
                onChange = { handleSelectChange }
            />
        </div>
    </div>
  )
}

export default example
