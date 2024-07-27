import axios from "axios";

const fetch = () => axios.get("projects")

const show = (project_id) => axios.get(`projects/${project_id}`)

const postProject = (project_details) => axios.post('projects', project_details);

const editPoject = (project_id, project_details) => axios.put(`projects/${project_id}`, project_details)

const projectApi = { fetch, show, postProject, editPoject };
export default projectApi;