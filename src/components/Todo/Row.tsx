import { AddTodo } from "./AddTodo";
import { UpdateTodo } from "./UpdateModal";

type Todo = {
  id: string;
  name: string;
  status: string;
  description: string;
};

type TodoProps = {
  todo: Todo;
  handleDeleteTodo: (id: string) => void;
  handleCheckTodo: (id: string) => void;
  handleUpdate: Function;
};

export const Row = ({
  todo: { name, status, id, description },
  handleDeleteTodo,
  handleCheckTodo,
  handleUpdate
}: TodoProps) => {
  console.log(status)

  const handleUpdate1 = (e: Todo) => {
    handleUpdate(e)
  }

  const ToBeEnd = (e: string) => {
    status !== 'Completed' && handleCheckTodo(e)
  }
  return (
    <div
      className={`flex transition duration-200 mb-2 w-full rounded  p-4 justify-between items-center ${status === 'Pending' ? 'bg-gray-200 ' : status === 'Deleted' ? 'bg-red-200' : 'bg-green-300/50'
        }`}
    >
      <p
        className={`ml-2 font-bold  text-xl font-sans first-letter:capitalize
         ${status === 'Deleted' ? 'text-gray-600/50 line-through' : 'text-gray-900/50'}
        `}
      >
        {name}
        <span className="font-thin"><p>{description}</p></span>
      </p>
      <div className='flex justify-between items-center mr-2'>
        <button
          className='h-7 w-7 mr-1 bg-slate-500  flex item-center text-white font-semibold transition duration-75  hover:bg-red-500 justify-center'
          aria-label='Delete a todo'
          onClick={() => handleDeleteTodo(id)}
          disabled={status === 'Completed' || status === 'Deleted'}
        >
          x
        </button>

        <UpdateTodo task={{ name, id, status, description }} handleSubmitTodo={handleUpdate1} />

        <input
          className='h-7 w-7 ml-1 rounded-3xl'
          type='checkbox'
          disabled={status === 'Deleted'}
          checked={status === 'Completed' ? true : false}
          onChange={() => ToBeEnd(id)}
        />
      </div>
    </div>
  );
};
