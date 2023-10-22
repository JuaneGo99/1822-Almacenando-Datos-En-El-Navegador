import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addTask = (evento) =>{
    // FUNCION QUE PERMITE QUE NO RECARGUE LA PAGINA WEB
    evento.preventDefault();
    // Llamando los input's
    const list = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const calender = document.querySelector('[data-form-date]');
    // Asingando los valores de los campos a VALUE
    const value = input.value;
    const date = calender.value;
    // Se le da el formato al Calendario
    const dateFormat = moment(date).format('DD/MM/YYYY');

    if(value === '' || date === ''){
        return;
    }
    // Limpienado los campos a DEFAULT 
    input.value = '';
    calender.value = '';
    // Almanacenar los datos a un objeto
    const taskObj = {
       value,
       dateFormat,
    }
    // Limpiamos todo el contenedor de LISTA
    list.innerHTML = '';
    // Sesion Storage - Solo almacena los datos cuando estamos en sesion
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    // Almacenando los datos en el ARRAY
    taskList.push(taskObj);
    // Los datos se guardan el Local Storage
    localStorage.setItem('tasks', JSON.stringify(taskList)); 

    displayTasks();
};
  
export const createTask = ( {value, dateFormat} ) => { 
    const task = document.createElement('li');
          task.classList.add('card');
    //backticks
    const taskContent = document.createElement('div');
    const titleTask = document.createElement('span');
          titleTask.classList.add('task');
          titleTask.innerText = value;
          taskContent.appendChild(checkComplete());
          taskContent.appendChild(titleTask);
    // task.innerHTML = content;
    const dateElement = document.createElement('span');
          dateElement.innerHTML = dateFormat;
          // Agregando los taks
          task.appendChild(taskContent);
          task.appendChild(dateElement);
          task.appendChild(deleteIcon());
    return task;
};
  