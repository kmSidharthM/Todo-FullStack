import React, { useEffect, useState } from 'react'
import Header from '../Common/Header';
import ProjectItem from '../Project/ProjectItem';
import AddNewProject from './AddNewProject';
import { projectApi } from '../../api/project';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


const HomePage = () => {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  const fetchProjects = async () => {
    try{
      const response = await projectApi.fetch(username);
      setProjectList(response);
    } catch(error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const deleteProject = async (project_id) => {
    try {
      await projectApi.deleteProject(project_id)
      fetchProjects();
    }
    catch(error) {
      console.log(error);
    }
  }

  const addProject = async (project_details) => {
    try {
      await projectApi.postProject(username, project_details);
      fetchProjects();
      console.log('Project added!');
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  if(isLoading) {
    return (
      <div className='flex justify-center items-center h-screen bg-black'> 
        <ClipLoader color='gold' />
      </div>
    )
  }


  return (
    <div className='bg-black font-poppins h-screen overflow-auto'>
      <Header title="Projects" />
      <div className='flex justify-center relative p-2'>
        <div className='flex flex-col space-y-2 w-80 lg:w-1/2'> 
          {
            projectList.map((project) => <ProjectItem {...project} deleteProject={deleteProject} key={project.project_id} />)
          }
        </div>
        <AddNewProject item="Project" addItem={addProject} />
      </div>
    </div>
  )
}

export default HomePage;