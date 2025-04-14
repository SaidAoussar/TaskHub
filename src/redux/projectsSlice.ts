import { Project } from '@/types/project.type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProjectById = createAsyncThunk(
  'projects/fetchById',
  async (projectId: number) => {
    const res = await fetch(`http://localhost:3001/projects/${projectId}`);
    if (!res.ok) throw new Error('Failed to fetch project');
    return await res.json();
  }
);

export const fetchProjects = createAsyncThunk('projects/fetch', async () => {
  const res = await fetch('http://localhost:3001/projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return await res.json();
});


export const addProject = createAsyncThunk(
  'projects/add',
  async (newProject: Omit<Project, 'id'>) => {
    const res = await fetch('http://localhost:3001/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    if (!res.ok) throw new Error('Failed to add project');
    return await res.json();
  }
);


const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default projectsSlice.reducer;
