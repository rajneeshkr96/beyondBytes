import React from 'react'
import Modal from '../Modals/Modal'

const AddtagModal = () => {
  return (
    <Modal btnClass='px-4 py-2 text-white bg-black rounded-3xl font-semibold' button="ADD NEW TAGS">
        <form action="">
            <input className="w-full px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white max-md:w-full " type="text" placeholder='Main Tags Name......' />
        </form>
    </Modal>
  )
}

export default AddtagModal
