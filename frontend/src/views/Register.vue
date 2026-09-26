<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../lib/supabase";

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function register() {
  errorMessage.value = "";
  successMessage.value = "";

  if (
    !name.value ||
    !username.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value =
      "Password must be at least 6 characters.";
    return;
  }

  loading.value = true;

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        name: name.value,
        username: username.value,
      },
    },
  });

  loading.value = false;

  if (error) {
    errorMessage.value = error.message;
    return;
  }

  if (!data.session) {
    successMessage.value =
      "Account created! Please check your email to verify your account.";
  } else {
    successMessage.value =
      "Account created successfully!";
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-[#0d0d0d] text-white
           flex items-center justify-center px-4 py-8"
  >
    <div class="w-full max-w-md">

      <div class="text-center mb-8">

        <h1 class="text-3xl font-bold">
          Create your account
        </h1>

        <p class="text-gray-400 mt-2">
          Start building with Serial Flasher
        </p>
      </div>

      <div
        class="bg-[#171717] border border-white/10
               rounded-2xl p-6 shadow-xl"
      >

        <form
          @submit.prevent="register"
          class="space-y-4"
        >

          <div>
            <label
              class="block text-sm font-medium
                     text-gray-300 mb-2"
            >
              Name
            </label>

            <input
              v-model="name"
              type="text"
              placeholder="Your name"
              autocomplete="name"
              class="w-full px-4 py-3 rounded-xl
                     bg-[#0f0f0f] border border-white/10
                     outline-none
                     focus:border-[#ff4400]
                     focus:ring-1 focus:ring-[#ff4400]
                     transition"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium
                     text-gray-300 mb-2"
            >
              Username
            </label>

            <input
              v-model="username"
              type="text"
              placeholder="yourusername"
              autocomplete="username"
              class="w-full px-4 py-3 rounded-xl
                     bg-[#0f0f0f] border border-white/10
                     outline-none
                     focus:border-[#ff4400]
                     focus:ring-1 focus:ring-[#ff4400]
                     transition"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium
                     text-gray-300 mb-2"
            >
              Email
            </label>

            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              class="w-full px-4 py-3 rounded-xl
                     bg-[#0f0f0f] border border-white/10
                     outline-none
                     focus:border-[#ff4400]
                     focus:ring-1 focus:ring-[#ff4400]
                     transition"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium
                     text-gray-300 mb-2"
            >
              Password
            </label>

            <input
              v-model="password"
              type="password"
              placeholder="At least 6 characters"
              autocomplete="new-password"
              class="w-full px-4 py-3 rounded-xl
                     bg-[#0f0f0f] border border-white/10
                     outline-none
                     focus:border-[#ff4400]
                     focus:ring-1 focus:ring-[#ff4400]
                     transition"
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium
                     text-gray-300 mb-2"
            >
              Confirm Password
            </label>

            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              autocomplete="new-password"
              class="w-full px-4 py-3 rounded-xl
                     bg-[#0f0f0f] border border-white/10
                     outline-none
                     focus:border-[#ff4400]
                     focus:ring-1 focus:ring-[#ff4400]
                     transition"
            />
          </div>

          <div
            v-if="errorMessage"
            class="px-4 py-3 rounded-xl
                   bg-red-500/10 border border-red-500/20
                   text-red-400 text-sm"
          >
            {{ errorMessage }}
          </div>

          <div
            v-if="successMessage"
            class="px-4 py-3 rounded-xl
                   bg-green-500/10 border border-green-500/20
                   text-green-400 text-sm"
          >
            {{ successMessage }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl
                   bg-[#ff4400] hover:bg-[#b33000]
                   disabled:opacity-50
                   disabled:cursor-not-allowed
                   font-semibold transition cursor-pointer"
          >
            {{ loading ? "Creating account..." : "Create Account" }}
          </button>

        </form>

        <div class="mt-6 text-center text-sm text-gray-400">
          Already have an account?

          <a
            href="/login"
            class="text-[#ff4400] hover:text-[#b33000]
                   font-medium transition"
          >
            Sign in
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

