
console.log("Загрузка данных..." + serverMocks.tasks);

initRobotManagementSystem();
initRobotsSection();
initSettingsSection();
initSubsystemsSection();
initSettingsSection();

// Добавляем обработчик событий для кнопок редактирования задач
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'edit-task-btn') {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        openEditTaskModal(taskId);
    }
});

updateTasksList();
updateRobotsList();
updateSubsystemsList();
updateSettingsList();