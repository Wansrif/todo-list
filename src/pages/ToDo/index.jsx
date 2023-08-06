import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEnter } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { BsUiChecks } from 'react-icons/bs';
import { FiDelete } from 'react-icons/fi';
import { FcCancel } from 'react-icons/fc';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleTheme } from '@containers/Theme/actions';
import { selectThemeMode } from '@containers/Theme/selectors';
import { selectTasks } from '@containers/Task/selectors';
import { setTasks } from '@containers/Task/actions';
import TextInput from '@components/TextInput';
import ToastNotification from '@components/ToastNotification';
import { uid } from 'uid';
import { motion } from 'framer-motion';
import { Container, Draggable } from 'react-smooth-dnd';
import DeleteModal from '@components/DeleteModal';
import classes from './style.module.scss';

const ToDo = ({ theme, onToggleTheme, tasks }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [idTask, setIdTask] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentTasks, setCurrentTasks] = useState(tasks);
  const dispatch = useDispatch();

  const isDarkMode = theme === 'dark';

  const handleTheme = () => {
    onToggleTheme();
  };

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'active') {
      return tasks.filter((item) => !item.completed);
    }
    if (activeFilter === 'complete') {
      return tasks.filter((item) => item.completed);
    }
    return tasks;
  }, [activeFilter, tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
      const updatedTasks = currentTasks.map((item) =>
        item.id === idTask
          ? {
              ...item,
              text: inputValue,
            }
          : item
      );
      dispatch(setTasks(updatedTasks));
      setIsEdit(false);
      setIdTask('');
      setInputValue('');
    } else {
      const newTask = {
        id: uid(),
        text: inputValue,
        completed: false,
      };
      dispatch(setTasks([newTask, ...currentTasks]));
      setInputValue('');
    }
  };

  const handleComplete = (id) => () => {
    dispatch(
      setTasks(
        currentTasks.map((item) =>
          item.id === id
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        )
      )
    );
  };

  const handleEdit = (id) => () => {
    const task = currentTasks.find((item) => item.id === id);
    setIdTask(id);
    setInputValue(task.text);
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setIdTask('');
    setInputValue('');
  };

  // Delete task and open modal
  const handleDelete = (id) => {
    setIsOpen(true);
    setIdTask(id);
  };

  // Cancel delete modal
  const handleCancel = () => {
    setIsOpen(false);
    setIdTask('');
  };

  // Delete confirm modal
  const handleDeleteConfirm = () => {
    setIsOpen(false);
    const updatedTasks = currentTasks.filter((item) => item.id !== idTask);
    dispatch(setTasks(updatedTasks));
  };

  const handleFilter = (type) => () => {
    setActiveFilter(type);
  };

  const handleClearComplete = () => {
    const updatedTasks = currentTasks.filter((item) => !item.completed);
    dispatch(setTasks(updatedTasks));
  };

  const handleDrop = (dropResult) => {
    if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
      const newTasksOrder = [...currentTasks];

      let { removedIndex, addedIndex } = dropResult;

      removedIndex = currentTasks.findIndex((item) => item.id === filteredTasks[removedIndex].id);
      addedIndex = currentTasks.findIndex((item) => item.id === filteredTasks[addedIndex].id);

      const [removed] = newTasksOrder.splice(removedIndex, 1);
      newTasksOrder.splice(addedIndex, 0, removed);

      dispatch(setTasks(newTasksOrder));
    }
  };

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  const scaleVariants = {
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={`${classes.container} ${isDarkMode ? classes.dark : ''}`}>
      <div
        className={classes.bgDesktop}
        style={{
          backgroundImage: `url(/images/${isDarkMode ? 'bg-desktop-dark.jpg' : 'bg-desktop-light.jpg'})`,
        }}
      />
      <div className={classes.todoLayout}>
        <div className={classes.todoHeader}>
          <div className={classes.todoHeader__title}>TODO</div>
          <div className={classes.todoHeader__theme} onClick={handleTheme}>
            <img src={`/images/${isDarkMode ? 'icon-sun.svg' : 'icon-moon.svg'}`} alt={isDarkMode ? 'moon' : 'sun'} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className={classes.formSubmit}>
          <BsUiChecks className={`${classes.todoList__icon} ${isDarkMode ? classes.dark : ''}`} />
          <TextInput
            darkMode={isDarkMode}
            setInputValue={setInputValue}
            inputValue={inputValue}
            setShowToast={setShowToast}
          />
          {showToast && (
            <ToastNotification message="You have exceeded the maximum (40) number of characters allowed for this field." />
          )}
          <motion.button
            type="submit"
            className={`${classes.submitTodo} ${isDarkMode ? classes.dark : ''}`}
            whileTap={{ scale: 0.9 }}
            variants={scaleVariants}
            whileHover="hover"
          >
            <AiOutlineEnter />
          </motion.button>
        </form>
        <div className={classes.todoList}>
          <div className={`${classes.todoList__body} ${filteredTasks.length > 6 ? classes.scrollY : ''}`}>
            {filteredTasks.length > 0 ? (
              <Container onDrop={handleDrop} dragHandleSelector=".drag-handle" orientation="vertical">
                {filteredTasks?.map((item) => (
                  <Draggable key={item.id}>
                    <div className={`${classes.todoList__item} ${isDarkMode ? classes.dark : ''}`}>
                      <div
                        className="drag-handle"
                        style={{
                          cursor: 'grab',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <div className={classes.checkboxContainer}>
                          <input
                            type="checkbox"
                            id={`check-${item.id}`}
                            className={classes.checkboxInput}
                            onChange={handleComplete(item.id)}
                            checked={item.completed}
                          />
                          <label
                            htmlFor={`check-${item.id}`}
                            className={`${classes.todoList__item__text} ${item.completed ? classes.completed : ''}`}
                          >
                            {item.text}
                          </label>
                        </div>
                        <div className={classes.opsi}>
                          <motion.div
                            className={classes.todoList__item__edit}
                            whileTap={{ scale: 0.9 }}
                            variants={scaleVariants}
                            whileHover="hover"
                          >
                            {!isEdit || idTask !== item.id ? (
                              <BiEditAlt onClick={handleEdit(item.id)} />
                            ) : (
                              <FcCancel onClick={handleCancelEdit} />
                            )}
                          </motion.div>
                          <motion.div
                            className={classes.todoList__item__delete}
                            onClick={() => handleDelete(item.id)}
                            whileTap={{ scale: 0.9 }}
                            variants={scaleVariants}
                            whileHover="hover"
                          >
                            <FiDelete />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Draggable>
                ))}
              </Container>
            ) : (
              <div
                className={`${classes.todoList__item__none} ${isDarkMode ? classes.dark : ''}`}
                style={{ justifyContent: 'center' }}
              >
                No tasks
              </div>
            )}
          </div>
          <div className={`${classes.todoFooter} ${isDarkMode ? classes.dark : ''}`}>
            <div className={classes.itemLeft}>{tasks?.filter((item) => !item.completed).length} items left</div>
            <div className={classes.options}>
              <motion.button
                type="button"
                className={activeFilter === 'all' ? classes.active : ''}
                onClick={handleFilter('all')}
                whileTap={{ scale: 0.9 }}
                variants={scaleVariants}
                whileHover="hover"
              >
                All
              </motion.button>
              <motion.button
                type="button"
                className={activeFilter === 'active' ? classes.active : ''}
                onClick={handleFilter('active')}
                whileTap={{ scale: 0.9 }}
                variants={scaleVariants}
                whileHover="hover"
              >
                Active
              </motion.button>
              <motion.button
                type="button"
                className={activeFilter === 'complete' ? classes.active : ''}
                onClick={handleFilter('complete')}
                whileTap={{ scale: 0.9 }}
                variants={scaleVariants}
                whileHover="hover"
              >
                Complete
              </motion.button>
            </div>

            <motion.button
              type="button"
              className={classes.clearComplete}
              onClick={handleClearComplete}
              whileTap={{ scale: 0.9 }}
              variants={scaleVariants}
              whileHover="hover"
            >
              Clear Completed
            </motion.button>
          </div>
        </div>
      </div>

      <DeleteModal
        isDarkMode={isDarkMode}
        isOpen={isOpen}
        onCancel={handleCancel}
        onDeleteConfirm={handleDeleteConfirm}
      />

      {/* Options Mobile */}
      <div className={`${classes.optionsMobile} ${isDarkMode ? classes.dark : ''}`}>
        <button type="button" className={activeFilter === 'all' ? classes.active : ''} onClick={handleFilter('all')}>
          All
        </button>
        <button
          type="button"
          className={activeFilter === 'active' ? classes.active : ''}
          onClick={handleFilter('active')}
        >
          Active
        </button>
        <button
          type="button"
          className={activeFilter === 'complete' ? classes.active : ''}
          onClick={handleFilter('complete')}
        >
          Complete
        </button>
      </div>
      <div className={classes.footer}>Drag and drop to reorder list</div>
    </div>
  );
};

ToDo.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  theme: selectThemeMode,
  tasks: selectTasks,
});

const mapDispatchToProps = {
  onToggleTheme: toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
