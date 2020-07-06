import api from './apiConfig';
import authHeader from './authHeader';

class apiService {
  getAllProjects() {
    return api.get('/project', { headers: authHeader() });
  }

  deleteProject(projectId) {
    return api.delete('/project/' + projectId, { headers: authHeader() });
  }

  createProject(title) {
    return api.post('/project', { title }, { headers: authHeader() });
  }

  updateProject(projectId, title) {
    console.log(projectId)
    console.log(title)
    return api.put('/project/' + projectId, { title }, { headers: authHeader() });
  }

  deleteTask(projectId, taskId) {
    return api.delete('/project/' + projectId + '/task/' + taskId, { headers: authHeader() });
  }

  createTask(projectId, description) {
    return api.post('/project/' + projectId + '/task', { description }, { headers: authHeader() });
  }

  updateTask(projectId, taskId, description) {
    return api.put('/project/' + projectId + '/task/' + taskId, { description }, { headers: authHeader() });
  }

  finishTask(projectId, taskId) {
    return api.put('/project/' + projectId + '/task/' + taskId + '/finish', {}, { headers: authHeader() });
  }

  signup(name, email, password) {
    return api.post("/signup", { name, email, password });
  }

  signin(email, password) {
    return api.post("/signin", { email, password }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getSignedUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  signout() {
    localStorage.removeItem("user");
  }
}

export default new apiService();