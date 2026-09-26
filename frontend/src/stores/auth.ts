import { ref } from "vue";
import { supabase } from "../lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  name: string;
  username: string;
  profile_photo_url: string | null;
}

const session = ref<Session | null>(null);
const user = ref<User | null>(null);
const loading = ref(true);
const profile = ref<Profile | null>(null);

const INACTIVITY_LIMIT = 6 * 60 * 60 * 1000;

let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
let rememberMe = false;
let initialized = false;


// =====================================================
// INITIALIZE
// =====================================================

export function useAuth() {

  async function initialize() {
    if (initialized) return;

    initialized = true;

    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    rememberMe =
      localStorage.getItem("remember_me") === "true";

    if (currentSession && !rememberMe) {
      const lastActivity = Number(
        localStorage.getItem("last_activity") || 0
      );

      if (
        lastActivity > 0 &&
        Date.now() - lastActivity >= INACTIVITY_LIMIT
      ) {
        console.log("Session expired due to inactivity");

        await supabase.auth.signOut();

        localStorage.removeItem("remember_me");
        localStorage.removeItem("last_activity");

        session.value = null;
        user.value = null;
        profile.value = null;
        loading.value = false;

        return;
      }
    }

    session.value = currentSession;
    user.value = currentSession?.user ?? null;

    loading.value = false;

    if (currentSession?.user) {
      await loadProfile(currentSession.user.id);

      if (!rememberMe) {
        startActivityTracking();
      }
    }

    supabase.auth.onAuthStateChange(
      async (_event, newSession) => {

        session.value = newSession;
        user.value = newSession?.user ?? null;

        if (newSession?.user) {

          await loadProfile(newSession.user.id);

          if (!rememberMe) {
            startActivityTracking();
          }

        } else {

          profile.value = null;
          stopActivityTracking();

        }
      }
    );
  }


  // =====================================================
  // PROFILE
  // =====================================================

  async function loadProfile(userId: string) {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(
        "Failed to load profile:",
        error
      );

      return;
    }

    profile.value = data;
  }


  // =====================================================
  // LOGIN
  // =====================================================

  async function login(
    email: string,
    password: string,
    remember: boolean
  ) {

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }

    rememberMe = remember;

    localStorage.setItem(
      "remember_me",
      String(remember)
    );

    localStorage.setItem(
      "last_activity",
      Date.now().toString()
    );

    session.value = data.session;
    user.value = data.user;

    if (data.user) {
      await loadProfile(data.user.id);
    }

    if (remember) {
      stopActivityTracking();
    } else {
      startActivityTracking();
    }
  }


  // =====================================================
  // ACTIVITY
  // =====================================================

  function handleActivity() {

    if (rememberMe || !session.value) {
      return;
    }

    localStorage.setItem(
      "last_activity",
      Date.now().toString()
    );

    resetInactivityTimer();
  }


  function resetInactivityTimer() {

    if (rememberMe || !session.value) {
      return;
    }

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(
      async () => {

        console.log(
          "Session expired due to inactivity"
        );

        await logout();

      },
      INACTIVITY_LIMIT
    );
  }


  // =====================================================
  // START ACTIVITY TRACKING
  // =====================================================

  function startActivityTracking() {

    window.addEventListener(
      "mousemove",
      handleActivity
    );

    window.addEventListener(
      "keydown",
      handleActivity
    );

    window.addEventListener(
      "click",
      handleActivity
    );

    window.addEventListener(
      "scroll",
      handleActivity
    );

    window.addEventListener(
      "touchstart",
      handleActivity
    );

    if (
      !localStorage.getItem("last_activity")
    ) {
      localStorage.setItem(
        "last_activity",
        Date.now().toString()
      );
    }

    resetInactivityTimer();
  }


  // =====================================================
  // STOP ACTIVITY TRACKING
  // =====================================================

  function stopActivityTracking() {

    window.removeEventListener(
      "mousemove",
      handleActivity
    );

    window.removeEventListener(
      "keydown",
      handleActivity
    );

    window.removeEventListener(
      "click",
      handleActivity
    );

    window.removeEventListener(
      "scroll",
      handleActivity
    );

    window.removeEventListener(
      "touchstart",
      handleActivity
    );

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  async function logout() {

    stopActivityTracking();

    await supabase.auth.signOut();

    session.value = null;
    user.value = null;
    profile.value = null;

    localStorage.removeItem("remember_me");
    localStorage.removeItem("last_activity");
  }


  return {
    session,
    user,
    profile,
    loading,

    initialize,
    login,
    logout,

    handleActivity,
    startActivityTracking,
    stopActivityTracking,
  };
}