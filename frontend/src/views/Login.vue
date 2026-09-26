<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../stores/auth";

const router = useRouter();

const auth = useAuth();

const email = ref("");
const password = ref("");
const loading = ref(false);

const errorMessage = ref("");
const successMessage = ref("");

const rememberMe = ref(false);

async function login() {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    await auth.login(email.value, password.value, rememberMe.value);

    successMessage.value = "Login successful!";

    await new Promise((resolve) => setTimeout(resolve, 500));

    await router.push("/");
  } catch (error: any) {
    console.error(error);

    errorMessage.value = error.message || "Failed to sign in.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4"
  >
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Welcome back</h1>

        <p class="text-gray-400 mt-2">Sign in to Serial Flasher</p>
      </div>

      <div
        class="bg-[#171717] border border-white/10 rounded-2xl p-6 shadow-xl"
      >
        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              class="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-white/10 outline-none focus:border-[#ff4400] focus:ring-1 focus:ring-[#ff4400] transition"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              class="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-white/10 outline-none focus:border-[#ff4400] focus:ring-1 focus:ring-[#ff4400] transition"
            />
          </div>

          <div class="flex items-center justify-between">
            <label
              class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer"
            >
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-white/10 bg-[#0f0f0f] accent-[#ff4400]"
              />

              <span> Remember me </span>
            </label>
          </div>

          <div
            v-if="errorMessage"
            class="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {{ errorMessage }}
          </div>

          <div
            v-if="successMessage"
            class="px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
          >
            {{ successMessage }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl bg-[#ff4400] hover:bg-[#b33000] disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
          >
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>
        <div class="mt-6 text-center text-sm text-gray-400">
          Don't have an account?

          <a
            href="/register"
            class="text-[#ff4400] hover:text-[#b33000] font-medium transition"
          >
            Create one
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
