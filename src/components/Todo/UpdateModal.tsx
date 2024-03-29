
import { ChangeEvent, FormEvent } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { AiFillEdit } from 'react-icons/ai'

type Todo = {
  id: string;
  name: string;
  status: string;
  description: string;
};

export type AddTodoProps = {
  task: Todo;
  handleSubmitTodo: Function;
};

export const UpdateTodo = ({
  task,
  handleSubmitTodo,
}: AddTodoProps) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const cancelButtonRef = useRef(null)
  const [description, setDescription] = useState('')

  const OnClick = () => {
    console.log('tsak', task)
    setName(task.name)
    setDescription(task.description)
    setOpen(!open)
  }

  const handleSubmit = () => {
    handleSubmitTodo({
      name,
      description,
      status: 'Pending',
      id: task.id
    })
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => OnClick()}
        className='h-7 w-7 bg-slate-500 flex item-center text-white font-semibold transition duration-75 rounded hover:bg-blue-500 justify-center'
        disabled={task.status === 'Completed' || task.status === 'Deleted'}
      >
        <AiFillEdit color="white" className='mx-auto my-auto' />
      </button>
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
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Update task
                        </Dialog.Title>
                        <div className="mt-2">
                          {/* <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently
                        removed. This action cannot be undone.
                      </p> */}
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
                                    value={name}
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
                                    value={description}
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
