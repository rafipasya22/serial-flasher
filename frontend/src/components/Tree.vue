<script setup lang="ts">
defineOptions({
  name: "FolderTree",
});
import { ref } from "vue";

defineProps<{
  parentId: string | null;
  selectedFolderId: string | null;
  childFolders: (parentId: string | null) => FolderNode[];
  projectsInFolder: (folderId: string | null) => Project[];
}>();

interface FolderNode {
  id: string;
  name: string;
  parent_id: string | null;
}
interface Project {
  id: string;
  name: string;
  folder_id: string | null;
}

const emit = defineEmits<{
  openProject: [id: string];
  deleteProject: [id: string];
  renameFolder: [id: string, name: string];
  deleteFolder: [id: string];
  createSubfolder: [parentId: string];
  dropProject: [projectId: string, folderId: string | null];
  dropFolder: [folderId: string, newParentId: string | null];
  selectFolder: [id: string | null];
}>();

const expanded = ref<Record<string, boolean>>({});
const renamingId = ref<string | null>(null);
const renameDraft = ref("");

function toggle(id: string) {
  expanded.value[id] = !expanded.value[id];
}

function startRename(f: FolderNode) {
  renamingId.value = f.id;
  renameDraft.value = f.name;
}

function confirmRename(id: string) {
  if (renameDraft.value.trim()) {
    emit("renameFolder", id, renameDraft.value.trim());
  }
  renamingId.value = null;
}

function onDragStartFolder(e: DragEvent, folderId: string) {
  e.dataTransfer?.setData("type", "folder");
  e.dataTransfer?.setData("id", folderId);
}

function onDragStartProject(e: DragEvent, projectId: string) {
  e.dataTransfer?.setData("type", "project");
  e.dataTransfer?.setData("id", projectId);
}

function onDrop(e: DragEvent, targetFolderId: string | null) {
  const type = e.dataTransfer?.getData("type");
  const id = e.dataTransfer?.getData("id");
  if (!id) return;

  if (type === "project") emit("dropProject", id, targetFolderId);
  if (type === "folder") emit("dropFolder", id, targetFolderId);
}
</script>

<template>
  <div class="folder-tree">
    <div
      v-for="folder in childFolders(parentId)"
      :key="folder.id"
      class="folder-item"
      @dragover.prevent
      @drop.stop="onDrop($event, folder.id)"
    >
      <div
        class="flex flex-row justify-between items-center gap-1 px-2 py-1 rounded hover:bg-white/5 cursor-pointer group"
        :class="selectedFolderId === folder.id ? 'bg-white/10' : ''"
        draggable="true"
        @dragstart="onDragStartFolder($event, folder.id)"
        @click="
          toggle(folder.id);
          emit('selectFolder', folder.id);
        "
      >
        <div class="flex flex-row justify-start items-center gap-1">
          <span class="material-symbols-outlined !text-[16px]">
            {{ expanded[folder.id] ? "folder_open" : "folder" }}
          </span>

          <input
            v-if="renamingId === folder.id"
            v-model="renameDraft"
            @click.stop
            @blur="confirmRename(folder.id)"
            @keyup.enter="confirmRename(folder.id)"
            @keyup.escape="renamingId = null"
            class="bg-[#1a1a1a] text-xs outline-none flex-1"
            autofocus
          />
          <span v-else class="text-xs flex-1 truncate">{{ folder.name }}</span>
        </div>
        <div class="flex flex-row justify-end items-center h-full py-1">
          <button
            @click.stop="emit('createSubfolder', folder.id)"
            class="opacity-0 group-hover:opacity-100 px-1 flex justify-center items-center cursor-pointer text-[#828282] hover:text-[#ff4400]"
          >
            <span class="material-symbols-outlined !text-[17px]"> add_circle </span>
          </button>
          <button
            @click.stop="startRename(folder)"
            class="opacity-0 group-hover:opacity-100 px-1 flex justify-center items-center cursor-pointer text-[#828282] hover:text-[#ff4400]"
          >
            <span class="material-symbols-outlined !text-[17px]">edit</span>
          </button>
          <button
            @click.stop="emit('deleteFolder', folder.id)"
            class="opacity-0 group-hover:opacity-100 px-1 flex justify-center items-center cursor-pointer hover:text-red-700 text-red-400"
          >
            <span class="material-symbols-outlined !text-[17px]">delete</span>
          </button>
        </div>
      </div>

      <div v-show="expanded[folder.id]" class="ps-4">
        <FolderTree
          :parent-id="folder.id"
          :selected-folder-id="selectedFolderId"
          :child-folders="childFolders"
          :projects-in-folder="projectsInFolder"
          @open-project="(id: any) => emit('openProject', id)"
          @delete-project="(id: any) => emit('deleteProject', id)"
          @rename-folder="
            (id: any, name: any) => emit('renameFolder', id, name)
          "
          @delete-folder="(id: any) => emit('deleteFolder', id)"
          @create-subfolder="(id: any) => emit('createSubfolder', id)"
          @select-folder="(id: any) => emit('selectFolder', id)"
          @drop-project="(pid: any, fid: any) => emit('dropProject', pid, fid)"
          @drop-folder="(fid: any, pid: any) => emit('dropFolder', fid, pid)"
        />

        <div
          v-for="project in projectsInFolder(folder.id)"
          :key="project.id"
          draggable="true"
          @dragstart="onDragStartProject($event, project.id)"
          class="flex items-center justify-between px-2 py-1 rounded hover:bg-white/5 group cursor-pointer"
        >
          <button
            @click="emit('openProject', project.id)"
            class="flex-1 text-left text-xs truncate cursor-pointer"
          >
            {{ project.name }}
          </button>
          <button
            @click.stop="emit('deleteProject', project.id)"
            class="opacity-0 group-hover:opacity-100 text-red-400 text-[10px] cursor-pointer"
          >
            <span class="material-symbols-outlined !text-[14px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
