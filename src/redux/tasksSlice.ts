// src/redux/tasksSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '@/types/task.type';

export const fetchTasksByProject = createAsyncThunk(
  'tasks/fetchByProject',
  async (projectId: number) => {
    const res = await fetch(`http://localhost:3001/tasks?projectId=${projectId}`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return await res.json();
  }
);

// src/redux/tasksSlice.ts
export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAll',
  async () => {
    const res = await fetch('http://localhost:3001/tasks');
    if (!res.ok) throw new Error('Failed to fetch all tasks');
    return await res.json();
  }
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async (newTask: Omit<Task, 'id'>) => {
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) throw new Error('Failed to add task');
    return await res.json();
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId: string) => {
    const res = await fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return taskId;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (task: Task) => {
    const res = await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return await res.json();
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    toggleTaskStatus: (state, action) => {
      const task = state.data.find((t) => t.id === action.payload);
      if (task) {
        task.status = task.status === "completed" ? "to_do" : "completed";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all tasks';
      })
      // Add
      .addCase(addTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter(task => task.id !== action.payload);
      })

      // Update
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.data.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});


export const { toggleTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
