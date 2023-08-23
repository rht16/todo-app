
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { GrAdd, GrLogout } from 'react-icons/gr';
import { useNavigate } from "react-router-dom";
import { LogOut } from '../../helper/logOut';


type Todo = {
  id: string;
  name: string;
  status: string;
  description: string;
};

export type AddTodoProps = {
  task: string;
  handleSubmitTodo: Function;
};

export const AddTodo = ({
  task,
  handleSubmitTodo,
}: AddTodoProps) => {
  const history = useNavigate();
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const cancelButtonRef = useRef(null)
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    handleSubmitTodo({
      name,
      description,
      status: 'Pending'
    })
    setOpen(false)
  }

  const handleLogOut = () => {
    LogOut()
    window.location.assign('/sign')
  }

  return (
    <>
      {/* <div className='flex p-2'> */}
      <button onClick={() => setOpen(!open)} className=" border-solid border-2 border-gray-600 my-2 hover:bg-blue-100 w-[15%] h-[40px]  justify-center align-middle px-4 rounded-full ml-[60%] lg:ml-[75%] lg:w-[8%] ">
        <GrAdd color='white' className='mx-auto' />
      </button>
      <button className=" hover:bg-blue-100 w-[15%] h-[40px] my-2 border-solid border-2 border-gray-600 ml-1 text-white font-bold  rounded-full  lg:w-[8%] justify-center align-middle"
        onClick={() => handleLogOut()}
      >
        <GrLogout color='white' className='mx-auto' />
      </button>
      {/* </div> */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add new task
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
                            <div>

                              <div style={{ display: 'flex' }}>

                                <div className="mt-2 mr-5">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                  </label>
                                  <input
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    name="name"
                                    type="text"
                                    // autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>


                                <div className="mt-2">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                  </label>
                                  <input
                                    onChange={(e) => setDescription(e.target.value)}
                                    id="description"
                                    name="description"
                                    type="text"
                                    // autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleSubmit()}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
