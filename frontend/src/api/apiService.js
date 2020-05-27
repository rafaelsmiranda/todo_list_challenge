import api from './apiConfig';
import authHeader from './authHeader';

class apiService {
  getAllProjects() {
    return api.get('/project', { headers: authHeader() });
  }

  deleteProject(projectId) {
    return api.delete('/project/${projectId}', { headers: authHeader() });
  }

  createProject(data) {
    return api.post('/project', data, { headers: authHeader() });
  }

  updateProject(projectId, data) {
    return api.put('/project/${projectId}', data, { headers: authHeader() });
  }

  deleteTask(projectId, taskId) {
    return api.delete('/project/${projectId}/task/${taskId}', { headers: authHeader() });
  }

  createTask(data) {
    return api.post('/project/${projectId}/task', data, { headers: authHeader() });
  }

  updateTask(projectId, taskId, data) {
    return api.put('/project/${projectId}/task/${taskId}', data, { headers: authHeader() });
  }

  finishTask(projectId, taskId) {
    return api.put('/project/${projectId}/${taskId}', { headers: authHeader() });
  }

  signup(username, email, password) {
    return api.post("/signup", {
      username,
      email,
      password
    });
  }

  sigin(email, password) {
    return api.post("/signin", { email, password }).then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  signout() {
    localStorage.removeItem("user");
  }
}

export default new apiService();