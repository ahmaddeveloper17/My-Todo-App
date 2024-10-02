import PropTypes from 'prop-types'; // Importing PropTypes
import tick from '../assets/tick.png';
import delete_icon from '../assets/delete.png';
import not_tick from '../assets/not_tick.png';

function Todoitems({ text, id, isComplete, deleteTodo, toggle }) {
  return (
    <div className="todo-item flex items-center my-3 gap-2">
      <div onClick={() => { toggle(id); }} className="flex flex-1 items-center cursor-pointer">
        <img src={isComplete ? tick : not_tick} alt={isComplete ? 'Completed' : 'Not Completed'} className="w-7" />
        <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 break-words ${isComplete ? "line-through" : ""}`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {text}
        </p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        src={delete_icon}
        alt="Delete"
        className="w-4 ml-5 cursor-pointer"
      />
    </div>
  );
}

// Adding PropTypes for props validation
Todoitems.propTypes = {
  text: PropTypes.string.isRequired, // 'text' should be a string and is required
  id: PropTypes.number.isRequired, // 'id' should be a number and is required
  isComplete: PropTypes.bool, // 'isComplete' should be a boolean (not required)
  deleteTodo: PropTypes.func.isRequired, // 'deleteTodo' should be a function and is required
  toggle: PropTypes.func.isRequired, // 'toggle' should be a function and is required
};

export default Todoitems;
