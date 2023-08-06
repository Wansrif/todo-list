import PropTypes from 'prop-types';
import classes from './style.module.scss';

const TextInput = ({ darkMode, setInputValue, inputValue, setShowToast }) => {
  const handleInputChange = (event) => {
    const inputValues = event.target.value;
    if (inputValues.length <= 40 && inputValues.trim() !== '') {
      setInputValue(inputValues);
      setShowToast(false);
    } else if (inputValues.length > 40) {
      setShowToast(true);
      setInputValue(inputValues.substring(0, 40));
    } else {
      setInputValue('');
    }
  };

  return (
    <input
      type="text"
      className={`${classes.todoInput} ${darkMode ? classes.dark : ''}`}
      placeholder="Create a new todo..."
      value={inputValue}
      onChange={handleInputChange}
      required
    />
  );
};

TextInput.propTypes = {
  darkMode: PropTypes.bool,
  setInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setShowToast: PropTypes.func.isRequired,
};

export default TextInput;
