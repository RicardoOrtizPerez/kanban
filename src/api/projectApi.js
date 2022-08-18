import axiosClient from "./axiosClient"

const projectApi = {
    getAllProjects: () => axiosClient.get('projects'),
    getProjectsByOrganization: (organization) => axiosClient.get(`projects/byAsociation/${organization}`),
    newProject: (project) => axiosClient.post('projects', project),
    deleteProject: (project) => axiosClient.post('projects/delete', project),
}

export default projectApi